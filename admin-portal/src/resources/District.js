import React from 'react';
import PropTypes from 'prop-types';
import {
  EditButton, Edit, SimpleForm, DisabledInput,
  TextInput, LongTextInput, NumberInput, List, Datagrid,
  TextField, NumberField, DateField, Create, ReferenceField,
  ReferenceInput, SelectInput, Filter, ChipField
} from 'react-admin';
import { UrlField } from '../fields';
import Icon from '@material-ui/icons/AccountBalance';

const DistrictFilter = props => (
  <Filter {...props}>
    <ReferenceInput label="City" source="city_id" reference="city">
      <SelectInput optionText="name" optionValue="id" />
    </ReferenceInput>
  </Filter>
);

export const DistrictList = (props) => {
  document.title = 'List District';
  return (
    <List title="District" {...props} filters={<DistrictFilter />}>
      <Datagrid>
        <NumberField label="ID" source="id" />
        <TextField label="Name" source="name" />
        <TextField label="Code" source="code" />
        <ReferenceField label="City" source="city_id" reference="city">
          <TextField source="name" />
        </ReferenceField>
        <NumberField label="Longitude" source="longitude" />
        <NumberField label="Latitude" source="latitude" />
        <UrlField label="Website" source="website" />
        <ChipField label="Tel" source="tel" />
        <DateField label="Created" source="created_at" showTime />
        <DateField label="Last Update" source="updated_at" showTime />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const DistrictTitle = ({ record }) =>
  <span>District {record ? `${record.id}. ${record.name} (${record.code})` : ''}</span>;

DistrictTitle.propTypes = { record: PropTypes.object };
DistrictTitle.defaultProps = { record: {} };

export const DistrictEdit = (props) => {
  document.title = 'Edit District';
  return (
    <Edit title={<DistrictTitle />} {...props}>
      <SimpleForm >
        <DisabledInput label="ID" source="id" />
        <TextInput label="Name" source="name" />
        <TextInput label="Code" source="code" />
        <ReferenceInput label="City" source="city_id" reference="city">
          <SelectInput optionText="name" optionValue="id" />
        </ReferenceInput>
        <NumberInput label="Longitude" source="longitude" />
        <NumberField label="Latitude" source="latitude" />
        <TextInput label="Website" source="website" />
        <TextInput label="Tel" source="tel" />
        <DisabledInput label="Created" source="created_at" />
        <DisabledInput label="Last Update" source="updated_at" />
      </SimpleForm>
    </Edit>
  );
};


export const DistrictCreate = (props) => {
  document.title = 'Create District';
  return (
    <Create title="Create District" {...props}>
      <SimpleForm>
        <TextInput label="Name" source="name" />
        <TextInput label="Code" source="code" />
        <ReferenceInput label="City" source="city_id" reference="city">
          <SelectInput optionText="name" optionValue="id" />
        </ReferenceInput>
        <NumberInput label="Longitude" source="longitude" />
        <NumberField label="Latitude" source="latitude" />
        <TextInput label="Website" source="website" />
        <TextInput label="Tel" source="tel" />
      </SimpleForm>
    </Create>
  );
};

export const DistrictIcon = Icon;