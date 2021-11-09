import { createContext, useEffect } from 'react';
import useCompress from '../../hooks/use-audio-compression';
import useTezos from '../../hooks/use-tezos';
import { IPFS_DEFAULT_THUMBNAIL_URI } from '../../constants';

const { create } = require('ipfs-http-client');

export const MintContext = createContext();

const infuraUrl = 'https://ipfs.infura.io:5001'
const ipfs = create(infuraUrl)

const MintProvider = ({ children }) => {
  const { auth, Tezos } = useTezos();
  const { handleCompress } = useCompress();

  const handleMint = async (payload) => {
    const p = payload;
    console.log(IPFS_DEFAULT_THUMBNAIL_URI)
    const compressedAudio = await handleCompress(p);
    console.log(compressedAudio)

    //upload files to ipfs
    const compressedAudioUri = await addToIpfs(compressedAudio.data)
    const artifactUri = await addToIpfs(p.audio)
    const displayUri = await addToIpfs(p.cover)
    const coverThumbUri = await addToIpfs(p.thumbnail)

    console.log(compressedAudioUri)
    console.log(artifactUri)
    console.log(displayUri)
    console.log(coverThumbUri)

    //prepare metadata file
    const name = p.title;
    const description = p.description;
    const tags = p.tags.replace(/\s/g, '').split(',');
    const symbol = 'OBJKT';
    const thumbnailUri = IPFS_DEFAULT_THUMBNAIL_URI;
    const creators = [auth.address];
    const mimeType = p.audio.type;

    console.log(creators);


    const metadata = Buffer.from(
      JSON.stringify({
        name,
        description,
        tags,
        symbol,
        artifactUri,
        displayUri,
        thumbnailUri,
        creators,
        formats: [{ uri: artifactUri, mimeType, compressedAudioUri, coverThumbUri }],
        decimals: 0,
        isBooleanAmount: false,
        shouldPreferSymbol: false,
      })
    )
    console.log(metadata)
    const nftCid = await addToIpfs(metadata)
    console.log(nftCid)

    console.log(p);
    console.log(p.amount);
    console.log(p.royalties);

    mint(auth.address, p.amount, nftCid.substr(7), p.royalties)

  };

  const addToIpfs = async (file) => {
    const hash = await ipfs.add(file);
    return `ipfs://${hash.path}`;
  }

  // Mint

  const mint = async (tz, amount, cid, royalties) => {
    // show feedback component with followind message and progress indicator

    console.log(cid)

    // call mint method
    await Tezos.wallet
      .at('KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9')
      .then((c) =>
        c.methods
          .mint_OBJKT(
            tz,
            parseFloat(amount),
            ('ipfs://' + cid)
              .split('')
              .reduce(
                (hex, c) =>
                  (hex += c.charCodeAt(0).toString(16).padStart(2, '0')),
                ''
              ),
            parseFloat(royalties) * 10
          )
          .send({ amount: 0, storageLimit: 310 })
      )
      .then((op) =>
        op.confirmation(1).then(() => {
          // if everything goes okay, show the success message and redirect to profile
          console.log("minted")
          console.log({ op: op.hash })

        })
      )
      .catch((err) => {
        // if any error happens
        console.log(err)
      })

  }


  return (
    <MintContext.Provider
      value={{ handleMint }}
    >
      {children}
    </MintContext.Provider>
  );

};

export default MintProvider;
