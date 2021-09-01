const FaqPage = () => {


    return (
        <>
           
            <h1>Faq</h1>
            <div>
                <p><strong>Q. How does the minting work on hen radio?</strong><br/>
                A. Mint your audio file (preferably ogg or mp3) as usual on https://www.hicetnunc.xyz/mint </p>
                
                <p><strong>Q. Does everything works as well in visual Hen?</strong><br/>
                A. Yes, everything on Hen.radio will also be available on Hen</p>

                <p><strong>Q. How do I create a playlist?</strong><br/>
                <u>A. To create a local playlist (only visible to you):</u><br/>
                <ol>
                    <li>Go to &quot;Playlists&quot; in the top right menu</li>
                    <li>Enter a title in the textbox &quot;Playlist Title&quot;</li>
                    <li>Click &quot;Create Playlist&quot;</li>
                    <li>Add tracks to the playlist by clicking the little &quot;+&quot; button next to each track.</li>
                    <li>Clicking the link icon will copy the link to the playlist. You can share this link via Twitter or email. For example: https://hen.radio/playlists/178891,11305,10159,8228</li>
                </ol>
                <br/>
                <u>A. To create a playlist with a cover image and visible to everybody:</u><br/>
                Work in progress... For now you can create a pull request on this file: <a href="https://github.com/henradio/hen-radio/blob/main/playlists/playlists.js">playlist.js</a><br/>
                </p>
                <p><strong>Q. What is your Discord?</strong><br/>
                A. Come and say hi! You can find the HEN Discord from the <a href="https://hicetnunc.xyz/about">About page</a>, and from there find the hicathon-wg-7-2-hic-radio. We do need people with experience with smart contract and tokens...</p>
            </div>
        </>
    );
};

export default FaqPage;