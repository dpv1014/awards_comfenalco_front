import React, {useContext, useEffect, useState} from 'react';
import styles from './People.module.scss';
import {useTranslation} from "react-i18next";
import PeopleApi from "../../api/v1/People";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import PeopleForm from "../PeopleForm/PeopleForm";
import {ContextApp} from "../../config/context";

function People() {
  const {t} = useTranslation();
  const [peopleList, setPeopleList] = useState([]);
  const [currentPeople, setCurrentPeople] = useState({});

  const [showFormEdit, setShowFormEdit] = useState(false);
  const peopleApi = new PeopleApi();
  const context = useContext(ContextApp);

  const updatePeopleInList = (newPeople) => {
    let people = peopleList;
    let idxPeople = null;
    for (let idx in people) {
      if (people[idx].id === newPeople.id)
        idxPeople = idx;
    }
    people[idxPeople] = newPeople;
    setPeopleList(people);
  }

  const addPeopleInList = (newPeople) => {
    let people = peopleList;
    people.push(newPeople);
    setPeopleList(people);
  }

  const peopleRows = peopleList.map((people, index) =>
    <tr>
      <td>{people.typedocument}</td>
      <td>{people.document}</td>
      <td>{people.name}</td>
      <td>{people.lastname}</td>
      <td>{people.birthdate}</td>
      <td>{people.award? people.award.description : t("Awards.no_award")}</td>
      <td className="m3">
        <Button variant="warning" onClick={(e) => getPeople(e, people, processFormEdit)}>{t('Actions.edit')}</Button>
        {!people.award && <Button variant="danger" onClick={(e) => destroyPeople(e, people, successGetPeople)}>{t('Actions.delete')}</Button>}
      </td>
    </tr>
  );

  const processFormEdit = (people) => {
    setCurrentPeople(people);
    setShowFormEdit(true);
  }

  const processFormCreate = (e) => {
    setCurrentPeople(null);
    setShowFormEdit(true);
  }

  const processAssignAwards = (e) => {
    if(window.confirm(t("Actions.are_you_sure"))) {
      peopleApi.peopleAssignAwards(
        (response) => {
          if(Array.isArray(response.data)) {
            setPeopleList(response.data);
            context.notificationService.success(t('Actions.messages.save_ok'));
          } else {
            context.notificationService.warning(t('Actions.messages.' + response.data));
          }
        },
        (response) => {
          console.log(response);
          console.error("Error with server communication...");
          context.notificationService.error(t('Actions.messages.error'));
        })
    }
  }

  const getPeople = (e, people, callback) => {
    peopleApi.getPeopleById(people.id,
      (response) => {
        callback(response.data);
      },
      (response) => {
        console.error("Error with server communication...")
      })
  }

  const destroyPeople = (e, people, callback) => {
    if(window.confirm(t("Actions.are_you_sure"))) {
      peopleApi.destroyPeopleById(people.id,
        (response) => {
          callback(response);
        },
        (response) => {
          console.error("Error with server communication...")
        })
    }
  }

  const successGetPeople = (response) => {
    if (response.status === 200) {
      setPeopleList(response.data);
    } else {
      console.error("Error with server communication...")
    }
  }

  const errorGetPeople = (response) => {
    console.error(response);
  }

  useEffect(() => {
    peopleApi.getPeople(successGetPeople, errorGetPeople);
  }, [])

  return (
    <div className={styles.People} data-testid="People">
      <div style={{display: 'flex'}}>
        <h2>{t('People.title')}</h2>
        <Button variant="primary" onClick={processFormCreate}>{t("Actions.create")}</Button>
        <Button variant="success" onClick={processAssignAwards}>{t("Actions.assign_awards")}</Button>
      </div>
      <hr/>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
          <th>{t('People.typedocument')}</th>
          <th>{t('People.document')}</th>
          <th>{t('People.name')}</th>
          <th>{t('People.lastname')}</th>
          <th>{t('People.birthdate')}</th>
          <th>{t('Awards.title')}</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {peopleRows}
        </tbody>
      </Table>
      {showFormEdit &&
      <PeopleForm addPeopleInList={addPeopleInList} people={currentPeople} show={showFormEdit} setShow={setShowFormEdit}
                  updatePeopleInList={updatePeopleInList}/>}
    </div>
  );
}

export default People;
