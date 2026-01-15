import { Edit, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from "react-admin";

function LessonEdit() {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} label="Title" />
                <ReferenceInput source="unitId" reference="units" />
                <NumberInput source="order" validate={[required()]} label="Order" />
            </SimpleForm>
        </Edit>
    )
};

export default LessonEdit;
