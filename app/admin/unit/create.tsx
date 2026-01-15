import { Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from "react-admin";

function UnitCreate() {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="id" validate={[required()]} label="Id" />
                <TextInput source="title" validate={[required()]} label="Title" />
                <TextInput source="description" validate={[required()]} label="Description" />
                <ReferenceInput source="courseId" reference="courses" />
                <NumberInput source="order" validate={[required()]} label="Order" />
            </SimpleForm>
        </Create>
    )
};

export default UnitCreate;
