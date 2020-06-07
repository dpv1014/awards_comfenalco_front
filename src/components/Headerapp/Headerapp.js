import React from 'react';
import styles from './Headerapp.module.scss';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {ROUTERS_URL} from "../../config/routes";
import {useTranslation} from "react-i18next";

function Headerapp() {
  const {t} = useTranslation();
  return(
    <div className={styles.Headerapp} data-testid="Headerapp">
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">AwardsApp</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href={ROUTERS_URL.people_path.url}>{t('People.title')}</Nav.Link>
          <Nav.Link href={ROUTERS_URL.awards_path.url}>{t('Awards.title')}</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}
export default Headerapp;
