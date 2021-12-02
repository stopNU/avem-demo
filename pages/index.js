import React from "react";

import DefaultLayout from "layouts";
import SliceZone from "components/slices/SliceZone";
import styles from "../styles/Home.module.css";

import { Client } from "utils/prismicHelpers";

const HomePage = ({ doc }) => {
  console.log("doc", doc);
  if (doc && doc.data) {
    return (
      <DefaultLayout>
        <main className={styles.main}>
          <div className="homepage">
            <h1 className={styles.title}>{doc.data.page_title[0].text}</h1>
            <SliceZone sliceZone={doc.data.body1} />
          </div>
        </main>
      </DefaultLayout>
    );
  }

  // Call the standard error page if the document was not found
  return null;
};

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;

  const client = Client();

  const doc = (await client.getSingle("homepage", ref ? { ref } : null)) || {};
  //const menu = await client.getSingle('menu', ref ? { ref } : null) || {}

  return {
    props: {
      doc,
      //menu,
      preview,
    },
  };
}

export default HomePage;
