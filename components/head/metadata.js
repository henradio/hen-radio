const Metadata = ({title, description, image, url}) =>
    <>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@hen_radio"/>
        <meta name="twitter:creator" content="@hen_radio"/>
        <meta name="twitter:title" content={title}/>
        <meta
            name="twitter:description"
            content={description}
        />
        <meta
            name="twitter:image"
            content={image}
        />
        <meta property="og:title" content={title}/>
        <meta property="og:url" content={url}/>
        <meta property="og:type" content="gallery"/>
        <meta
            property="og:description"
            content={description}
        />
        <meta
            property="og:image"
            content={image}
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </>
;

export default Metadata;
