import React from "react";
import Select from "react-select";

const ModelMultiSelect = ({label, placeholder, models, value = [], onChange }) => {
  // Convert your models into react-select options
  const options = models.map((model) => ({
    value: model.boxNumber,
    label: `${model.modelName} - ${model.boxNumber}`,
  }));

  // Ensure value is an array of strings (boxNumbers)
  const safeValue = Array.isArray(value) ? value.map(String) : [];

  // Match selected options by value
  const selectedOptions = options.filter((o) => safeValue.includes(o.value));

  return (
    <div className="mb-3">
      <label className="form-label">
        {label} <span className="text-danger">*</span>
      </label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}   // ✅ correct format for react-select
        onChange={(selected) => {
          const values = selected ? selected.map((s) => s.value) : [];
          onChange(values);
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ModelMultiSelect;
