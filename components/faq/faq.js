import styles from './styles.module.css';

const Faq = () =>
    <>
        <h1>FAQ</h1>
        <div className={styles.faqItems}>
            <p><strong>Q. What is Hen.radio?</strong></p>
            <p>A. Hen.radio is Hic et Nunc, or HEN, NFT Music Player. It
               has been created during the first Hicathon in 2021.
               It aims at making it easier to discover, listen to and
               reward NFT music artists. See our
               presentation <a href="https://docs.google.com/presentation/d/1t7zirrVZ0wHu0Fx6HJeGZzsDzS0s5n4TEwT9QdC-by4/edit?usp=sharing">
                    <u>here</u></a>.
            </p>
            <p><strong>Q. How does the minting work on hen radio?</strong></p>
            <p>A. Sync your wallet using
               the <strong>sync</strong> button on the top right
               corner. A <strong>Mint</strong> button will then appear.
               Find more details on how to mint <a href="https://github.com/henradio/hen-radio/wiki/How-to#how-to-mint">
                    <u>here</u></a>.
            </p>
            <p><strong>Q. Is everything here also work on Hic et Nunc?</strong>
            </p>
            <p>A. Yes, everything on hen.radio will also be available on
               the main Hic et Nunc site</p>
            <p><strong>Q. Is there an app?</strong></p>
            <p>A. Not at the moment. It is optimised for viewing in the
               mobile browser, but no app yet.</p>
            <p><strong>Q. Why don&apos;t you support video or html
                       music?</strong></p>
            <p>A. Currently technical restrictions are making it
               difficult to differenciate music HTML from other HTML
               objkt. For video, the is different than the handling of
               audio, so it is also difficult to implement.</p>
            <p><strong>Q. How do I create a playlist?</strong></p>
            <p>A1. To create a local playlist (only visible to you):</p>
            <ol>
                <li>Go to &quot;Playlists&quot; in the top right menu
                </li>
                <li>Enter a title in the textbox &quot;Playlist
                    Title&quot;</li>
                <li>Click &quot;Create Playlist&quot;</li>
                <li>Add tracks to the playlist by clicking the
                    little &quot;+&quot; button next
                    to each track.
                </li>
                <li>Clicking the link icon will copy the link to the
                    playlist. You can share
                    this link via Twitter or email. For example:
                    {' '}
                    <a href="https://hen.radio/playlists/178891,11305,10159,8228">https://hen.radio/playlists/178891,11305,10159,8228</a>
                </li>
            </ol>
            <p>A2. To create a playlist with a cover image and visible
               to everybody you can message our twitter account
               @hen_radio with:</p>
            <ol>
                <li>The link to the playlist (see above, eg:
                    {' '}
                    <a href="https://hen.radio/playlists/178891,11305,10159,8228">https://hen.radio/playlists/178891,11305,10159,8228</a>
                    )
                </li>
                <li>Title of the playlist</li>
                <li>Description</li>
                <li>The playlist creator alias, name or twitter handle
                </li>
                <li>Cover image in jpeg format</li>
            </ol>
            <p>Playlists are a work in progress, please be patient, we
               will do our best to include all submissions.</p>
            <p><strong>Q. How can I contribute? How do we contact
                       Hen.radio?</strong></p>
            <p>A.</p>
            <ul>
                <li>You can find us on Discord: <a href="https://discord.gg/gj7U6r96aF"><strong>hen-radio</strong></a></li>
                <li>Twitter: <a href="https://twitter.com/hen_radio"><strong>@hen_radio</strong></a>
                </li>
                <li>Github: <a href="https://github.com/henradio/hen-radio"><strong>hen-radio</strong></a>
                </li>
            </ul>
        </div>
    </>;

export default Faq;
