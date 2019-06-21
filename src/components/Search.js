import React, { Component } from 'react';
import styled from 'styled-components';

// helper to remove comma;
const removeTrailingComma = string => {
  return string[string.length - 1] === ','
    ? string.slice(0, string.length - 1)
    : string;
};
class Search extends Component {
  state = {
    name: '',
    cityState: '',
    email: '',
    address: '',
    phone: '',
    url: ''
  };

  handleInputChange = e => {
    const inputName = e.target.name;
    const inputValue = this.state[e.target.name].slice();
    let nameInput;
    let cityStateInput;
    if (inputValue.length === 0) {
      if (inputName === 'name') {
        cityStateInput = this.state.cityState;
      } else if (inputName === 'cityState') {
        nameInput = this.state.name;
      } else {
        cityStateInput = '';
        nameInput = '';
      }
      //   reset all inputs
      this.setState({
        name: nameInput,
        cityState: cityStateInput,
        email: '',
        address: '',
        phone: '',
        url: ''
      });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  //   check if name
  // name should be 2 or 3 words
  isName = name => {
    if (name.length) {
      let numberOfWords = name.trim().split(' ').length;
      let isNumberOfWords2Or3 = numberOfWords === 2 || numberOfWords === 3;
      let nameIsNotANumber = name.replace(/[^0-9]+/g, '').length === 0;
      return isNumberOfWords2Or3 && nameIsNotANumber;
    }
    return false;
  };

  //   check if email
  // should be able to split on @
  isEmail = email => {
    if (email.length) {
      let isValidEmail = email.trim().split('@').length;
      return isValidEmail === 2;
    }
    return false;
  };

  isPhone = phone => {
    console.log(phone);
    let phoneNumsOnly = phone.replace(/[^0-9]+/g, '');
    console.log(phoneNumsOnly);
    return phoneNumsOnly.length === 10;
  };

  isUrl = url => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(url);
  };

  formatRequestObject = type => {
    const { name, cityState, email, phone } = this.state;
    const person = {};
    switch (type) {
      case 'name':
        person.names = [];
        let splitName = name.trim().split(' ');
        if (splitName.length === 2) {
          person.names.push({ first: splitName[0], last: splitName[1] });
        } else if (splitName.length === 3) {
          person.names.push({
            first: removeTrailingComma(splitName[0]),
            middle: removeTrailingComma(splitName[2]),
            last: removeTrailingComma(splitName[1])
          });
        }
        if (cityState.length) {
          person.addresses = [];
          let splitAddress = cityState.trim().split(' ');
          if (splitAddress.length > 1) {
            let state = splitAddress.pop();
            let city = splitAddress.join(' ');
            // remove comma if at end of city
            city = removeTrailingComma(city);

            person.addresses.push({
              state: state,
              city: city
            });
          }
        }
        console.log(person);
        return person;
      case 'email':
        person.emails = [];
        if (email.length) {
          person.emails.push({
            address: email
          });
        }
        console.log(person);
        return person;
      case 'phone':
        if (phone.length) {
          person.phones = [];
          person.phones.push({
            number: phone.replace(/[^0-9]+/g, '')
          });
        }
        console.log(person);
        return person;
      default:
        break;
    }
  };

  findInputWithLength = () => {
    let input;
    let name;
    for (let key in this.state) {
      if (key !== 'cityState') {
        if (this.state[key].length) {
          input = this.state[key].slice();
          name = key;
        }
      }
    }
    if (name && input) {
      return { [name]: input };
    } else {
      console.log('something went wrong in findInputWithLength');
    }
  };
  //   check if cityState
  // city state can be multiple words
  // last one should be state
  // check second to last one for comma

  handleFormSubmit = e => {
    e.preventDefault();

    let inputKey;
    let inputValue;
    const inputObj = this.findInputWithLength();
    const { name, email, phone, url } = this.state;

    for (let [key, value] of Object.entries(inputObj)) {
      inputKey = key;
      inputValue = value;
    }

    if (this.isName(inputValue)) {
      if (!name.length) {
        this.setState({ name: inputValue, [inputKey]: '' });
      }
      this.formatRequestObject('name');
      console.log(inputValue);
    } else if (this.isEmail(inputValue)) {
      if (!email.length) {
        this.setState({ email: inputValue, [inputKey]: '' });
      }
      this.formatRequestObject('email');
      console.log(inputValue);
    } else if (this.isPhone(inputValue)) {
      if (!phone.length) {
        this.setState({ phone: inputValue, [inputKey]: '' });
      }
    } else if (this.isUrl(inputValue)) {
      if (!url.length) {
        this.setState({ url: inputValue, [inputKey]: '' });
      }
      console.log('is a url');
    } else {
      console.log('input invalid');
    }
  };

  render() {
    const { name, cityState, email, address, phone, url } = this.state;
    return (
      <StyledForm onSubmit={this.handleFormSubmit}>
        <FormGroup>
          <FormLabel htmlFor="name">Name:</FormLabel>
          <FormInput
            type="text"
            value={name}
            onChange={this.handleInputChange}
            name="name"
            id="name"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="cityState">City, State:</FormLabel>
          <FormInput
            type="text"
            value={cityState}
            onChange={this.handleInputChange}
            name="cityState"
            id="cityState"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput
            type="text"
            value={email}
            onChange={this.handleInputChange}
            name="email"
            id="email"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="address">Address:</FormLabel>
          <FormInput
            type="text"
            value={address}
            onChange={this.handleInputChange}
            name="address"
            id="address"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="phone">Phone:</FormLabel>
          <FormInput
            type="text"
            value={phone}
            onChange={this.handleInputChange}
            name="phone"
            id="phone"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="url">URL:</FormLabel>
          <FormInput
            type="text"
            value={url}
            onChange={this.handleInputChange}
            name="url"
            id="url"
          />
        </FormGroup>
        <Button>Search</Button>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const FormLabel = styled.label`
  font-size: 14px;
  margin-bottom: 3px;
`;

const FormInput = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #79c7c5;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 3px;
  border: 1px solid #ddd;
  font-family: inherit;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: #79c7c5;
    border-color: #79c7c5;
    background: #fcfcfc;
  }
`;

export default Search;
