const FormSection = ({ title, fields, renderField, fieldClassName }) => {
  if (!fields || fields.length === 0) return null;

  return (
    <>
      {title && <h2 className="section-title">{title}</h2>}
      <div className="row">
        {fields.map((field) => (
          <div className={`field ${fieldClassName || ""}`} key={field.name}>
            {renderField(field)}
          </div>
        ))}
      </div>
    </>
  );
};

export default FormSection;
