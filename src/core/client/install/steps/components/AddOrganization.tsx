import { Localized } from "fluent-react/compat";
import React, { StatelessComponent } from "react";
import { Field, Form } from "react-final-form";
import { OnSubmit } from "talk-framework/lib/form";
import {
  composeValidators,
  required,
  validateEmail,
  validateURL,
} from "talk-framework/lib/validation";
import {
  Button,
  ButtonIcon,
  CallOut,
  Flex,
  FormField,
  HorizontalGutter,
  InputDescription,
  InputLabel,
  TextField,
  Typography,
  ValidationMessage,
} from "talk-ui/components";

import * as styles from "./styles.css";

interface FormProps {
  organizationName: string;
  organizationContactEmail: string;
  organizationURL: string;
}

export interface AddOrganizationForm {
  onSubmit: OnSubmit<FormProps>;
  onGoToPreviousStep: () => void;
  data: FormProps;
}

const AddOrganization: StatelessComponent<AddOrganizationForm> = props => {
  return (
    <Form
      onSubmit={props.onSubmit}
      initialValues={{
        organizationName: props.data.organizationName,
        organizationContactEmail: props.data.organizationContactEmail,
        organizationURL: props.data.organizationURL,
      }}
    >
      {({ handleSubmit, submitting, submitError }) => (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <HorizontalGutter size="double">
            <Localized id="install-addOrganization-title">
              <Typography variant="heading1" align="center">
                Add Organization
              </Typography>
            </Localized>
            <Localized id="install-addOrganization-description">
              <Typography variant="bodyCopy" align="center">
                Please tell us the name of your organization. This will appear
                in emails when inviting new team members.
              </Typography>
            </Localized>

            {submitError && (
              <CallOut color="error" fullWidth>
                {submitError}
              </CallOut>
            )}

            <Field
              name="organizationName"
              validate={composeValidators(required)}
            >
              {({ input, meta }) => (
                <FormField>
                  <Localized id="install-addOrganization-orgName">
                    <InputLabel>Organization Name</InputLabel>
                  </Localized>
                  <Localized
                    id="install-addOrganization-orgNameTextField"
                    attrs={{ placeholder: true }}
                  >
                    <TextField
                      name={input.name}
                      onChange={input.onChange}
                      value={input.value}
                      placeholder="Organization Name"
                      color={
                        meta.touched && (meta.error || meta.submitError)
                          ? "error"
                          : "regular"
                      }
                      disabled={submitting}
                      fullWidth
                    />
                  </Localized>
                  {meta.touched &&
                    (meta.error || meta.submitError) && (
                      <ValidationMessage fullWidth>
                        {meta.error || meta.submitError}
                      </ValidationMessage>
                    )}
                </FormField>
              )}
            </Field>

            <Field
              name="organizationContactEmail"
              validate={composeValidators(required, validateEmail)}
            >
              {({ input, meta }) => (
                <FormField>
                  <Localized id="install-addOrganization-orgEmail">
                    <InputLabel>Organization Contact Email</InputLabel>
                  </Localized>
                  <Localized
                    id="install-addOrganization-orgEmailTextField"
                    attrs={{ placeholder: true }}
                  >
                    <TextField
                      name={input.name}
                      onChange={input.onChange}
                      value={input.value}
                      placeholder="Organization Contact Email"
                      color={
                        meta.touched && (meta.error || meta.submitError)
                          ? "error"
                          : "regular"
                      }
                      disabled={submitting}
                      fullWidth
                    />
                  </Localized>
                  {meta.touched &&
                    (meta.error || meta.submitError) && (
                      <ValidationMessage fullWidth>
                        {meta.error || meta.submitError}
                      </ValidationMessage>
                    )}
                </FormField>
              )}
            </Field>

            <Field
              name="organizationURL"
              validate={composeValidators(required, validateURL)}
            >
              {({ input, meta }) => (
                <FormField>
                  <Localized id="install-addOrganization-orgURL">
                    <InputLabel>Organization URL</InputLabel>
                  </Localized>
                  <Localized id="install-addOrganization-orgURLDescription" strong={<strong/>}>
                    <InputDescription>
                      Be sure to include <strong>http://</strong> or <strong>https://</strong> in your URL
                    </InputDescription>
                  </Localized>
                  <Localized
                    id="install-addOrganization-orgURLTextField"
                    attrs={{ placeholder: true }}
                  >
                    <TextField
                      name={input.name}
                      onChange={input.onChange}
                      value={input.value}
                      placeholder="Organization URL"
                      color={
                        meta.touched && (meta.error || meta.submitError)
                          ? "error"
                          : "regular"
                      }
                      disabled={submitting}
                      fullWidth
                    />
                  </Localized>
                  {meta.touched &&
                    (meta.error || meta.submitError) && (
                      <ValidationMessage fullWidth>
                        {meta.error || meta.submitError}
                      </ValidationMessage>
                    )}
                </FormField>
              )}
            </Field>
            <Flex direction="row-reverse" itemGutter>
              <Button
                variant="filled"
                color="primary"
                size="large"
                type="submit"
                disabled={submitting}
              >
                <Localized id="install-next">
                  <span>Next</span>
                </Localized>
                <ButtonIcon className={styles.buttonIcon}>
                  arrow_forward
                </ButtonIcon>
              </Button>
              <Localized id="install-back">
                <Button
                  onClick={props.onGoToPreviousStep}
                  variant="filled"
                  color="regular"
                  size="large"
                  disabled={submitting}
                >
                  Back
                </Button>
              </Localized>
            </Flex>
          </HorizontalGutter>
        </form>
      )}
    </Form>
  );
};

export default AddOrganization;
