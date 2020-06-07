import React, {useContext, useRef, useState} from 'react';
import styles from './PeopleForm.module.scss';
import {useTranslation} from "react-i18next";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ContextApp} from "../../config/context";
import PeopleApi from "../../api/v1/People";
import {Formik} from "formik";
const yup = require('yup')

function PeopleForm (props){
  const {t} = useTranslation();
  const [show, setShow] = useState(props.show);

  let n_people = props.people;
  if(n_people == null){
    n_people = {
      isNew: true,
      typedocument: "",
      document: "",
      name: "",
      lastname: "",
      birthdate: ""
    }
  } else {
    n_people.isNew = false;
  }
  const [people] = useState(n_people);

  const context = useContext(ContextApp);
  const formRef = useRef(null);
  const peopleApi = new PeopleApi();
  const schema = yup.object({
    typedocument: yup.string().required(),
    document: yup.string().required(),
    name: yup.string().required(),
    lastname: yup.string().required(),
    birthdate: yup.string().required()
  });

  const handleClose = () => {
    setShow(false);
    props.setShow(false);
  }

  const handleSubmit = (newPeople) => {
    if(!people.isNew){
      peopleApi.updatePeople(newPeople, (response) => {
        context.notificationService.success(t('Actions.messages.save_ok'));
        props.updatePeopleInList(response.data);
        handleClose();
      }, (response) => {
        context.notificationService.error(t('Actions.messages.error'));
      })
    } else {
      peopleApi.createPeople(newPeople, (response) => {
        context.notificationService.success(t('Actions.messages.save_ok'));
        props.addPeopleInList(response.data);
        handleClose();
      }, (response) => {
        context.notificationService.error(t('Actions.messages.error'));
      })
    }
  };

  return (
    <div className={styles.PeopleForm} data-testid="PeopleForm">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{(people.isNew)?  t('Actions.create') + " " + t('People.title'): t('Actions.editing') + ":" + people.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={people}
          >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
              <Form noValidate onSubmit={handleSubmit} ref={formRef}>
                <Form.Row>
                  <Form.Group controlId="typedocument">
                    <Form.Label>{t('People.typedocument')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('People.typedocument')}
                      value={values.typedocument}
                      name="typedocument"
                      onChange={handleChange}
                      isValid={errors.typedocument == null && touched.typedocument} />
                    {errors.typedocument && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group controlId="document">
                    <Form.Label>{t('People.document')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('People.document')}
                      value={values.document}
                      name="document"
                      onChange={handleChange}
                      isValid={errors.document == null && touched.document} />
                    {errors.document && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group controlId="name">
                    <Form.Label>{t('People.name')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('People.name')}
                      value={values.name}
                      name="name"
                      onChange={handleChange}
                      isValid={errors.name == null && touched.name} />
                    {errors.name && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group controlId="lastname">
                    <Form.Label>{t('People.lastname')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('People.lastname')}
                      value={values.lastname}
                      name="lastname"
                      onChange={handleChange}
                      isValid={errors.lastname == null && touched.lastname} />
                    {errors.lastname && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group controlId="birthdate">
                    <Form.Label>{t('People.birthdate')}</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder={t('People.birthdate')}
                      value={values.birthdate}
                      name="birthdate"
                      onChange={handleChange}
                      isValid={errors.birthdate == null && touched.birthdate} />
                    {errors.birthdate && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                  </Form.Group>
                </Form.Row>

                <Modal.Footer>
                  <Button variant="secondary" type="button" onClick={handleClose}>
                    {t("Actions.close")}
                  </Button>
                  <Button variant="primary" type="submit" >
                    {t("Actions.send")}
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>

      </Modal>
    </div>
  )
}
export default PeopleForm;
