import React, {useContext, useRef, useState} from 'react';
import styles from './AwardForm.module.scss';
import {useTranslation} from "react-i18next";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ContextApp} from "../../config/context";
import AwardApi from "../../api/v1/Award";
import {Formik} from "formik";
const yup = require('yup')

function AwardForm (props){
  const {t} = useTranslation();
  const [show, setShow] = useState(props.show);

  let n_award = props.award;
  if(n_award == null){
    n_award = {
      isNew: true,
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      active: true
    }
  } else {
    n_award.isNew = false;
  }
  const [award] = useState(n_award);

  const context = useContext(ContextApp);
  const formRef = useRef(null);
  const awardApi = new AwardApi();
  const schema = yup.object({
    code: yup.string().required(),
    description: yup.string().required(),
    count: yup.string().min("0").required()
  });

  const handleClose = () => {
    setShow(false);
    props.setShow(false);
  }

  const handleSubmit = (newAward) => {
    if(!award.isNew){
      awardApi.updateAward(newAward, (response) => {
        context.notificationService.success(t('Actions.messages.save_ok'));
        props.updateAwardInList(response.data);
        handleClose();
      }, (response) => {
        context.notificationService.error(t('Actions.messages.error'));
      })
    } else {
      awardApi.createAward(newAward, (response) => {
        context.notificationService.success(t('Actions.messages.save_ok'));
        props.addAwardInList(response.data);
        handleClose();
      }, (response) => {
        context.notificationService.error(t('Actions.messages.error'));
      })
    }
  };

  return (
    <div className={styles.AwardForm} data-testid="AwardForm">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{(award.isNew)?  t('Actions.create') + " " + t('Awards.title'): t('Actions.editing') + ": " + award.description}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={award}
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
                  <Form.Group controlId="code">
                    <Form.Label>{t('Awards.code')}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={t('Awards.code')}
                      value={values.code}
                      name="code"
                      min="0"
                      step="0.1"
                      onChange={handleChange}
                      isValid={errors.code == null && touched.code} />
                    {errors.code && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group controlId="description">
                    <Form.Label>{t('Awards.description')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('Awards.description')}
                      value={values.description}
                      name="description"
                      onChange={handleChange}
                      isValid={touched.description && !errors.description} />
                    {errors.description && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group controlId="count">
                    <Form.Label>{t('Awards.count')}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={t('Awards.count')}
                      value={values.count}
                      name="count"
                      min="0"
                      step="0.1"
                      onChange={handleChange}
                      isValid={touched.count && !errors.count} />
                    {errors.count && <div className="invalid-feedback" style={{display: 'block'}}>{t("Errors.required_field")}</div>}
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
export default AwardForm;
