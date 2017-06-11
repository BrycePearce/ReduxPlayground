import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Container from './Container';
function mapStateToProps(state) {
  return { 
    user: state.user
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
//connect injects the data from our store, to whatever component that we need it in (Container in this case)
const App = connect(mapStateToProps, mapDispachToProps)(Container);

export default App;