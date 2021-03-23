const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_NUMBER_ONLY = 'NUMBER_ONLY';

//----------------------------------------------
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });

export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});

export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});

export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });

export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });

export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const VALIDATOR_NUMBER_ONLY = () => ({
  type: VALIDATOR_TYPE_NUMBER_ONLY,
});

//-----------------------------------------
export const validate = (value, validators) => {
  let errorText = [];
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid &= value.trim().length > 0;
      !isValid && errorText.push('Trường này không được để trống');
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid &= value.trim().length >= validator.val;
      !isValid &&
        errorText.push(`Xin nhập tối thiểu là ${validator.val} ký tự`);
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid &= value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid &= +value >= validator.val;
      !isValid && errorText.push(`Giá trị tối thiểu là ${validator.val}`);
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid &= +value <= validator.val;
      !isValid && errorText.push(`Giá trị tối đa là ${validator.val}`);
    }

    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid &= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );

      !isValid && errorText.push('Xin hãy nhập đúng email');
    }

    if (validator.type === VALIDATOR_TYPE_NUMBER_ONLY) {
      isValid &= /^\d+$/.test(value);

      !isValid && errorText.push('Xin hãy nhập số nguyên');
    }
  }
  return [isValid, errorText];
};
