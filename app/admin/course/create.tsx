import { Create, NumberInput, required, SimpleForm, TextInput } from "react-admin";

function CourseCreate() {
    return (
        <Create>
            <SimpleForm>
                <NumberInput source="id" validate={[required()]} label="Id" />
                <TextInput source="title" validate={[required()]} label="Title" />
                <TextInput source="imageSrc" validate={[required()]} label="Image" />
            </SimpleForm>
        </Create>
    )
};

export default CourseCreate;
