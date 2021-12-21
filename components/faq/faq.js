import styles from './styles.module.css';

const Faq = () =>
    <>
        <h1>FAQ</h1>
        <div className={styles.faqItems}>
            <p className={styles.faqQuestion}><strong>Q. What is Hen.radio?</strong></p>
            <p className={styles.faqAnswer}>A. Hen.radio is an NFT Music Player and a community. Our goal is to make it easier to discover, listen to and reward NFT music artists, in the Hen spirit of inclusivity, diversity, multiculturalism.
                <br />
                It was created during the first <a href="https://medium.com/@timongty/hic-et-nunc-community-led-growth-through-the-hicathon-5181d8f310e4"><strong>Hicathon</strong></a> in May 2021,
                by the initial working group:&nbsp;
                <strong>
                    <a href='https://twitter.com/lauzaki'>@lauzaki</a>
                    ,{' '}
                    <a href='https://twitter.com/andreasrau_eu'>@andreasrau_eu</a>
                    ,{' '}
                    <a href='https://twitter.com/uvdsc'>@uvdsc</a>
                    ,{' '}
                    <a href='https://twitter.com/__orderandchaos'>@__orderandchaos</a>
                    ,{' '}
                    <a href='https://twitter.com/webidente'>@webidente</a>
                    ,{' '}
                    <a href='https://twitter.com/BabyCommando_'>@BabyCommando_</a>
                    ,{' '}
                    <a href='https://twitter.com/jclayton'>@jclayton</a>
                    ,{' '}
                    <a href='https://twitter.com/v5mt_tv'>@v5mt</a></strong><br />
                See our presentation <a href="https://docs.google.com/presentation/d/1t7zirrVZ0wHu0Fx6HJeGZzsDzS0s5n4TEwT9QdC-by4/edit?usp=sharing">
                    <u><strong>here</strong></u></a>.
            </p>
            <p className={styles.faqQuestion}><strong>Q. How does the minting work on hen radio?</strong></p>
            <p className={styles.faqAnswer}>A. Sync your wallet using the <strong>sync</strong> button on the top right
                corner. A <strong>Mint</strong> button will then appear.
                Find more details on how to mint <a href="https://github.com/henradio/hen-radio/wiki/How-to#how-to-mint">
                    <u><strong>here</strong></u></a>.
            </p>
            <p className={styles.faqQuestion}><strong>Q. Does everything here also work on Hic et Nunc?</strong>
            </p>
            <p className={styles.faqAnswer}>A. Yes, everything on hen.radio will also be available on
                the main Hic et Nunc site. Mints, collects and swaps are all made on the Hic et Nunc contracts.</p>
            <p className={styles.faqQuestion}><strong>Q. Is there an app?</strong></p>
            <p className={styles.faqAnswer}>A. Not at the moment. It is optimised for viewing in the
                mobile browser, but no app yet.</p>
            <p className={styles.faqQuestion}><strong>Q. Why don&apos;t you support video or html
                music?</strong></p>
            <p className={styles.faqAnswer}>A. Currently technical restrictions are making it
                difficult to differenciate music HTML from other HTML
                objkt. For video, the is different than the handling of
                audio, so it is also difficult to implement.</p>
            <p className={styles.faqQuestion}><strong>Q. How do I create a playlist?</strong></p>
            <p className={styles.faqAnswer}>A1. To create a local playlist (only visible to you):</p>
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
                to all.<strong>(Only for files less than 6Mb, or having been minted on hen.radio)</strong>: DM our twitter account
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
                will do our best to include all submissions. If we are not yet following you on Twitter, come and say hi in Discord.</p>
            <p className={styles.faqQuestion}><strong>Q. How can I contribute? How do we contact
                Hen.radio?</strong></p>
            <p className={styles.faqAnswer}>A. The best place to engage with us is through the <a href='https://discord.gg/gj7U6r96aF'>Discord</a>, or find our social details below.
            </p>
        </div>
    </>;

export default Faq;
