const FaqPage = () => {


    return (
        <>
           
            <h1>Faq</h1>
            <div>
                <p><strong>Q. What is Hen.radio?</strong><br/>
                A. Hen.radio is Hic et Nunc, or HEN, NFT Music Player. It has been created during the first Hicathon in 2021.<br/>
                It aims at making it easier to discover, listen to and reward NFT music artists.</p>
                

                <p><strong>Q. How does the minting work on Hen.radio?</strong><br/>
                A. Mint your audio file (preferably ogg or mp3) as usual on <a href="https://www.hicetnunc.xyz/mint"><u>hicetnunc.xyz/mint</u></a> </p>
                
                <p><strong>Q. Does everything works as well in visual HEN?</strong><br/>
                A. Yes, everything on Hen.radio will also be available on HEN</p>

                <p><strong>Q. How do I create a playlist?</strong><br/>
                A1. To create a local playlist (only visible to you):<br/>
                <ol>
                    <li>Go to &quot;Playlists&quot; in the top right menu</li>
                    <li>Enter a title in the textbox &quot;Playlist Title&quot;</li>
                    <li>Click &quot;Create Playlist&quot;</li>
                    <li>Add tracks to the playlist by clicking the little &quot;+&quot; button next to each track.</li>
                    <li>Clicking the link icon will copy the link to the playlist. You can share this link via Twitter or email. For example: https://hen.radio/playlists/178891,11305,10159,8228</li>
                </ol>
                A2. To create a playlist with a cover image and visible to everybody:<br/>
                Work in progress... For now you can create a pull request on this file: <a href="https://github.com/henradio/hen-radio/blob/main/playlists/playlists.js"><u>playlist.js</u></a><br/>
                </p>
                <p><strong>Q. How can I contribute? How do we contact Hen.radio?</strong><br/>
                A. <li>You can find the HEN Discord from this <a href="https://hicetnunc.xyz/about"><u>About page</u></a>, and from there find the hicathon-wg-7-2-hic-radio group.</li>
                   <li>Twitter: <a href='https://twitter.com/hen_radio'>@hen_radio</a></li>
                   <li>Github: <a href='https://github.com/henradio/hen-radio'>hen-radio</a></li>
                </p>
            </div>
        </>
    );
};

export default FaqPage;