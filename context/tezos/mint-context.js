import {createContext, useState} from 'react';
import useCompress from '../../hooks/use-audio-compression';

const {create} = require('ipfs-http-client');

export const MintContext = createContext();

const infuraUrl = 'https://ipfs.infura.io:5001'
const ipfs = create(infuraUrl)

const MintProvider = ({children}) => {

    const {handleCompress} = useCompress();

    const handleMint = async(payload) => {
        const p = payload;
        console.log('handle mint');
        const compressedAudio = await handleCompress(p);
        console.log(compressedAudio)

        //upload compressed audio to ipfs
        const compressedAudioHash = await ipfs.add(compressedAudio.data)
        console.log(compressedAudioHash)
        const compressedAudioUri = `ipfs://${compressedAudioHash.path}`
        console.log(compressedAudioUri)

        //upload audio to ipfs
        const audioHash = await ipfs.add(p.audio)
        console.log(audioHash)
        const audioUri = `ipfs://${audioHash.path}`
        console.log(audioUri)

        //upload cover to ipfs
        const coverHash = await ipfs.add(p.cover)
        console.log(coverHash)
        const coverUri = `ipfs://${coverHash.path}`
        console.log(coverUri)

        //upload coverThumb to ipfs
        const coverThumbHash = await ipfs.add(p.thumbnail)
        console.log(coverThumbHash)
        const coverThumbUri = `ipfs://${coverThumbHash.path}`
        console.log(coverThumbUri)



        //uploadMetadataFile(p.title, p.description, p.tags, audioUri, "<TODO:ADD MINTER ADDRESS>" , p.audio.type, coverHash, IPFS_DEFAULT_THUMBNAIL_URI, compressedAudioUri, coverThumbUri)
        //mint(minterAddress, amount, nftCid.path, royalties)
    };
/*
    async function uploadMetadataFile({
        name,
        description,
        tags = '',
        cid,
        address,
        mimeType,
        displayUri = '',
        thumbnailUri = IPFS_DEFAULT_THUMBNAIL_URI,//keeping this for compatibility with HEN
        compressedAudioUri = '',
        coverThumbUri = '',
      }) {

        return await ipfs.add(
          Buffer.from(
            JSON.stringify({
              name,
              description,
              tags: tags.replace(/\s/g, '').split(','),
              symbol: 'OBJKT',
              artifactUri: cid,
              displayUri,
              thumbnailUri,
              creators: [address],
              formats: [{ uri: cid, mimeType, compressedAudioUri, coverThumbUri }],
              decimals: 0,
              isBooleanAmount: false,
              shouldPreferSymbol: false,
            })
          )
        )
      }
*/
      // Mint
/*
      const mint = async (tz, amount, cid, royalties) => {
        // show feedback component with followind message and progress indicator

        console.log(cid)

        // call mint method
        await Tezos.wallet
          .at(this.state.proxyAddress || this.state.v1)
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
              this.setState({ op: op.hash }) // save hash
              // if everything goes okay, show the success message and redirect to profile
              this.state.setFeedback({
                message: 'OBJKT minted successfully',
                progress: true,
                confirm: false,
              })

              // hide after 1 second
              setTimeout(() => {
                this.state.setFeedback({
                  visible: false,
                })
              }, 1000)
            })
          )
          .catch((err) => {
            // if any error happens
            console.log(err)
            })

            // hide after 1 second
            setTimeout(() => {
              this.state.setFeedback({
                visible: false,
              })
            }, 1000)
          }
      
*/
    return (
        <MintContext.Provider
            value={{handleMint}}
        >
            {children}
        </MintContext.Provider>
    );

};

export default MintProvider;
