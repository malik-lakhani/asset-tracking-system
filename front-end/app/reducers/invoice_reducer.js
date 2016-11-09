import {
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILULER,
  SET_FIELDS_INVOICES
} from '../../constants';

const initialState =
  {
    Invoices: [],
    isFetching : true,
    fetched : false,
    err : '',

    data: [],
    index: [],

    serialNos: {},
    serialNo: {},

    componentName: {},
    componentNames: {},

    description: {},
    descriptions: {},

    category: {},
    categories: {},

    warranty: {},
    warrantyDates: {}
  }

export default function invoices (state = initialState, action) {
  switch (action.type) {
    case FETCH_INVOICES_SUCCESS:
      return Object.assign({}, state, { Invoices: action.response.data, isFetching:false, fetched:true, err:''});

    case FETCH_INVOICES_FAILULER:
      return Object.assign({}, state, { Invoices: action.response.data, isFetching:false, fetched:false, err:err});

    case SET_FIELDS_INVOICES:
      let componentIndex = action.field.split('_')[1];
      state.index.push(componentIndex)
      let index = state.index.length;
      let previousIndex = state.index[index - 2]

      if(previousIndex == undefined) {
        previousIndex = 0;
      }

      if(action.field.includes("serial")) {
        if(componentIndex == previousIndex) {
          let serialNo = "serialNo" + componentIndex
          state.serialNo[serialNo] = action.value;
        } else {
          let serialNo = "serialNo" + componentIndex
          state.serialNos["serialNo"] = state.serialNo
        }
      } else if (action.field.includes("component")) {
        if(componentIndex == previousIndex) {
          let component = "component" + componentIndex
          state.componentName[component] = action.value;
        } else {
          let component = "component" + componentIndex
          state.componentNames["component"] = state.componentName
        }
      } else if (action.field.includes("description")) {
        if(componentIndex == previousIndex) {
          let description = "description" + componentIndex
          state.description[description] = action.value;
        } else {
          let description = "description" + componentIndex
          state.descriptions["description"] = state.description
        }
      } else if (action.field.includes("category")) {
        if(componentIndex == previousIndex) {
          let category = "category" + componentIndex
          state.category[category] = action.value;
        } else {
          let category = "category" + componentIndex
          state.categories["category"] = state.category
        }
      } else if (action.field.includes("warranty")) {
        if(componentIndex == previousIndex) {
          let warranty = "warranty" + componentIndex
          state.warranty[warranty] = action.value;
        } else {
          let warranty = "warranty" + componentIndex
          state.warrantyDates["warranty"] = state.warranty
        }
      }

      // if(componentIndex == tempIndex)
      // var component = state;
      let newState = {};
      state.data[componentIndex]
      newState[action.field] = action.value;
      state.data.push(newState)

      return Object.assign({}, state.data, state);

    default:
      return state
  }
}
