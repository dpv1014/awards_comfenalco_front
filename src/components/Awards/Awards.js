import React, {useEffect, useState} from 'react';
import styles from './Awards.module.scss';
import {useTranslation} from "react-i18next";
import AwardApi from "../../api/v1/Award";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import AwardForm from "../AwardForm/AwardForm";

function Awards(){
  const {t} = useTranslation();
  const [awardList, setAwardList] = useState([]);
  const [currentAward, setCurrentAward] = useState({});

  const [showFormEdit, setShowFormEdit] = useState(false);
  const awardApi = new AwardApi();

  const updateAwardInList = (newAward) => {
    let award = awardList;
    let idxAward = null;
    for (let idx in award) {
      if (award[idx].id === newAward.id)
        idxAward = idx;
    }
    award[idxAward] = newAward;
    setAwardList(award);
  }

  const addAwardInList = (newAward) => {
    let award = awardList;
    award.push(newAward);
    setAwardList(award);
  }

  const awardRows = awardList.map((award, index) =>
    <tr>
      <td>{award.code}</td>
      <td>{award.description}</td>
      <td>{award.count}</td>
      <td className="m3">
        <Button variant="warning" onClick={(e) => getAward(e, award, processFormEdit)}>{t('Actions.edit')}</Button>
      </td>
    </tr>
  );

  const processFormEdit = (award) => {
    setCurrentAward(award);
    setShowFormEdit(true);
  }

  const processFormCreate = (e) => {
    setCurrentAward(null);
    setShowFormEdit(true);
  }

  const getAward = (e, award, callback) => {
    awardApi.getAwardById(award.id,
      (response) => {
        callback(response.data);
      },
      (response) => {
        console.error("Error with server communication...")
      })
  }

  const successGetAward = (response) => {
    if (response.status === 200) {
      setAwardList(response.data);
    } else {
      console.error("Error with server communication...")
    }
  }

  const errorGetAward = (response) => {
    console.error(response);
  }

  useEffect(() => {
    awardApi.getAwards(successGetAward, errorGetAward);
  }, [])

  return (
    <div className={styles.Award} data-testid="Award">
      <div style={{display: 'flex'}}>
        <h2>{t('Awards.title')}</h2>
        <Button variant="primary" onClick={processFormCreate}>{t("Actions.create")}</Button>
      </div>
      <hr/>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
          <th>{t('Awards.code')}</th>
          <th>{t('Awards.description')}</th>
          <th>{t('Awards.count')}</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {awardRows}
        </tbody>
      </Table>
      {showFormEdit &&
      <AwardForm addAwardInList={addAwardInList} award={currentAward} show={showFormEdit} setShow={setShowFormEdit}
                  updateAwardInList={updateAwardInList}/>}
    </div>
  );
}
export default Awards;
