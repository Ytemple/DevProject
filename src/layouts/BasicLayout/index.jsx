import React from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import style from './index.module.scss';

export default function BasicLayout(props) {
  const { children } = props;
  const theme = 'dark';
  return (
    <Layout 
    fixable 
    className={style.iceLayout}>

          <Layout.Header type="secondary">
            <Header />
          </Layout.Header>

      <Layout.Section>
        <Layout.Aside>
          <Aside />
        </Layout.Aside>


        <Layout.Main scrollable style={{padding:'20px'}}>
          <div className="main-container">
            { children }
          </div>
       {/**   <Footer />  */} 
        </Layout.Main>
      </Layout.Section>
    </Layout>
  );
}
