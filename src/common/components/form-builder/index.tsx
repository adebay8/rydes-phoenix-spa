import React from "react";
import { useAppContext } from "../../../store";
import { actionSetFormItem } from "../../../store/actions/form.action";
import { Button } from "../../elements";
import { FormElement } from "./form-element";
import { ElementCommonProps, FormBuilderProps } from "./types";

const FormBuilder: React.FC<FormBuilderProps> = ({
   controls,
   onSubmit,
   classNames,
   submitButtonLabel = "Submit",
}) => {
   const [{ loading, form }, dispatch] = useAppContext();

   const displayButton = (classNames?: { [key: string]: string }) => {
      return (
         <Button type="submit" disabled={loading} loading={loading} className={classNames?.button}>
            {submitButtonLabel}
         </Button>
      );
   };

   const onChange: ElementCommonProps["onChange"] = (data) => {
      dispatch(actionSetFormItem(data));
   };

   const displayControls = () => {
      return controls.map((control, index) => {
         const props = {
            ...control,
            properties: {
               ...control.properties,
               value: form?.[control.properties.name] ?? control.properties?.value ?? "",
               onChange,
            },
         };
         return <FormElement {...props} key={index} />;
      });
   };

   const handleSubmission: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      onSubmit?.(form);
   };

   return (
      <form onSubmit={handleSubmission} className={classNames?.form}>
         {displayControls()}
         {onSubmit && displayButton(classNames)}
      </form>
   );
};

export default FormBuilder;
