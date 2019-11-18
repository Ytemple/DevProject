import React from 'react';
import Layout from '@icedesign/layout';

import styles from './index.module.scss';

export default function Footer() {
  return (
    <Layout.Footer className={styles.iceDesignLayoutFooter}>
      <div className={styles.iceDesignLayoutFooterBody}>
        <div className={styles.logo} />
        <div className={styles.copyright}>
          © 2019  designed by HUST
        </div>
      </div>
    </Layout.Footer>
  );
}
