import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown-v2';
import AddCategory from './AddCategory';

class AddDropdownMenu extends Component {
  render() {
    let data = [{
      value: 'Add Item',
    }, {
      value: 'Add Category',
    }, {
      value: 'Scan Receipt',
    }];

    return (
        <Dropdown
          label='options'
          data={data}
        />
    );
  }
}

export default AddDropdownMenu