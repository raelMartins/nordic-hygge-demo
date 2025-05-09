import {useState} from 'react';

const useFormError = () => {
  const [formError, setFormError] = useState({});

  function isBelow18YearsOld(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    // Check if the birthday has already occurred this year
    const hasBirthdayOccurred =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

    if (age < 18 || (age === 18 && !hasBirthdayOccurred)) {
      return true;
    } else {
      return false;
    }
  }

  function hasNumber(value) {
    return /\d/.test(value);
  }

  function isAbove150YearsOld(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age > 150) {
      return true;
    } else if (age === 150) {
      // Check if the birthday has already occurred this year
      const hasBirthdayOccurred =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
      if (hasBirthdayOccurred) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const handle = {
    phoneForReg: value => {
      const regex = /^\d+$/;

      if (!value.trim()) {
        return setFormError({
          ...formError,
          phoneForReg: 'This field cannot be empty. Please enter a value.',
        });
      }

      if (!regex.test(value)) {
        setFormError({
          ...formError,
          phoneForReg: 'please enter only numbers',
        });
      } else if (!(value.length >= 10 && value.length <= 15)) {
        setFormError({...formError, phoneForReg: 'Invalid input length !'});
      } else {
        return setFormError({...formError, phoneForReg: null});
      }
    },
    phone: value => {
      const regex = /^\d+$/;

      if (!value.trim()) {
        return setFormError({...formError, phone: null});
      }

      if (!regex.test(value)) {
        setFormError({...formError, phone: 'please enter a number'});
      } else if (!(value.length >= 10 && value.length <= 15)) {
        setFormError({...formError, phone: 'Invalid input length !'});
      } else {
        return setFormError({...formError, phone: null});
      }
    },
    bvn: value => {
      const regex = /^\d+$/;
      if (!regex.test(value)) {
        setFormError({
          ...formError,
          bvn: 'please enter a number',
        });
      } else if (value.length !== 11) {
        setFormError({
          ...formError,
          bvn: 'Bvn must be exactly 11 characters long.',
        });
      } else {
        return setFormError({...formError, bvn: null});
      }
    },
    email: email => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.trim()) {
        return setFormError({
          ...formError,
          email: 'This field cannot be empty. Please enter a valid email.',
        });
      }
      if (!emailRegex.test(email)) {
        return setFormError({
          ...formError,
          email: 'Invalid email address format.',
        });
      } else {
        return setFormError({...formError, email: null});
      }
    },
    date_of_birth: inputDate => {
      const input = new Date(inputDate);

      if (isBelow18YearsOld(inputDate)) {
        return setFormError({
          ...formError,
          date_of_birth: 'Age limit not met. You must be 18 or older to use this service.',
        });
      }
      if (isAbove150YearsOld(inputDate)) {
        return setFormError({
          ...formError,
          date_of_birth: 'Age limit exceeded! Please enter a valid birth date.',
        });
      }
      if (isNaN(input?.getTime())) {
        return setFormError({
          ...formError,
          date_of_birth: 'Invalid Date format.',
        });
      } else {
        return setFormError({...formError, date_of_birth: null});
      }
    },
    date_of_birth_updated: inputDate => {
      const input = new Date(inputDate);
      const parts = inputDate.split('/');
      const currentDate = new Date();

      const month = parseInt(parts[0]);
      const day = parts[1] ? parseInt(parts[1]) : null;
      const year = parts[2] ? parseInt(parts[2]) : null;

      // Validate the month, day, and year values
      if (month < 1 || month > 12) {
        return setFormError({
          ...formError,
          date_of_birth_updated: 'Invalid month.',
        });
      }

      if (day == null || day < 1 || day > 31) {
        return setFormError({
          ...formError,
          date_of_birth_updated: 'Invalid day.',
        });
      }
      if (year === null || year.length < 4) {
        return setFormError({
          ...formError,
          date_of_birth_updated: 'Invalid year.',
        });
      }

      if (input > currentDate) {
        return setFormError({
          ...formError,
          date_of_birth_updated: 'Please select an earlier date',
        });
      }

      if (isNaN(input?.getTime())) {
        return setFormError({
          ...formError,
          date_of_birth_updated: 'Invalid Date format.',
        });
      } else {
        return setFormError({...formError, date_of_birth_updated: null});
      }
    },
    first_name: value => {
      if (hasNumber(value)) {
        return setFormError({
          ...formError,
          first_name: 'field can not contain a number',
        });
      }
      if (!value.trim()) {
        return setFormError({
          ...formError,
          first_name: 'This field cannot be empty. Please enter a value.',
        });
      } else {
        return setFormError({...formError, first_name: null});
      }
    },
    last_name: value => {
      if (hasNumber(value)) {
        return setFormError({
          ...formError,
          last_name: 'field can not contain a number',
        });
      }
      if (!value.trim()) {
        return setFormError({
          ...formError,
          last_name: 'This field cannot be empty. Please enter a value.',
        });
      } else {
        return setFormError({...formError, last_name: null});
      }
    },
    quantity: value => {
      if (!/^\d+$/.test(value)) {
        return setFormError({
          ...formError,
          quantity: 'invalid format',
        });
      }
      if (~~value < 1) {
        return setFormError({
          ...formError,
          quantity: 'Hold up, you forgot to select the quantity!',
        });
      } else {
        return setFormError({...formError, quantity: null});
      }
    },
  };

  const handleError = (name, value) => {
    return handle[name](value);
  };
  return {
    handleError,
    formError,
  };
};

export default useFormError;
