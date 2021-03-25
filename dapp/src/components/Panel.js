import React from 'react';

import './Panel.css';

class FormInput extends React.Component {

     render() {

          return (

               <tr>
                    <td id="form-label"><label >{this.props.label}</label></td>
                    <td><input id="form-input" class="shadow-normal" type={this.props.type} enabled="no" /></td>
               </tr>

          )

     }

}

class FormOtpAuth extends React.Component {

     render() {

          return (

               <tr>
                    <td id="form-label"><label >{this.props.label}</label></td>
                    <td>
                         <input id="form-otpauth" class="shadow-normal" name="otp_a" disabled />
                         <input id="form-otpauth" class="shadow-normal" name="otp_b" disabled />
                         <input id="form-otpauth" class="shadow-normal" name="otp_c" disabled />
                         <input id="form-otpauth" class="shadow-normal" name="otp_d" disabled />
                         <input id="form-otpauth" class="shadow-normal" name="otp_e" disabled />
                         <input id="form-otpauth" class="shadow-normal" name="otp_f" disabled />
                    </td>

               </tr>

          )

     }

}

class FormButton extends React.Component {

     render() {

          return (
               <td><button id="form-button" class="" onClick={this.props.onClick}>{this.props.label}</button></td>
          )

     }

}

class PanelHeader extends React.Component {

     render() {

          return (

               <div id="panel-group">
                    <div id="panel-heading">{this.props.heading}</div>
               </div>

          )

     }

}

class Panel extends React.Component {

     owner() {

          return (

               <div id="lock-screen">
                    <div id="form-panel" class="shadow-normal">

                         <PanelHeader heading="Owner Settings" />

                         <table><tr>
                              <td>
                                   <div id="panel-group">
                                        <PanelHeader heading="Pump Value" />
                                        <table id="debug">
                                             <FormInput type="email"    label="Email"    />
                                             <FormInput type="password" label="Password" />
                                        </table>
                                   </div>
                              </td>

                              <td>
                                   <div id="panel-group"><center>
                                        <table id="form-table-fixed">
                                        <tr>
                                        <FormButton label="Pump Value" />
                                        <FormButton label="Dump Value" />
                                        </tr>
                                        </table></center>
                                   </div>
                              </td>

                         </tr></table>

                    </div>
               </div>

          );

     }

     register() {

          return (

               <form>

                    <div class="form-row">

                         <div class="col-md-4 mb-3">
                              <label for="validationServer01">First name</label>
                              <input type="text" class="form-control is-valid" id="validationServer01" value="Mark" required />
                              <div class="valid-feedback">Looks good!</div>
                         </div>

                         <div class="col-md-4 mb-3">
                              <label for="validationServer02">Last name</label>
                              <input type="text" class="form-control is-valid" id="validationServer02" value="Otto" required />
                              <div class="valid-feedback">Looks good!</div>
                         </div>

                         <div class="col-md-4 mb-3">
                              <label for="validationServerUsername">Username</label>
                              <div class="input-group">
                                   <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupPrepend3">@</span>
                                   </div>
                                   <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend3" required />
                                   <div class="invalid-feedback">Please choose a username.</div>
                              </div>
                         </div>

                    </div>

                    <div class="form-row">

                         <div class="col-md-6 mb-3">
                              <label for="validationServer03">City</label>
                              <input type="text" class="form-control is-invalid" id="validationServer03" required />
                              <div class="invalid-feedback">Please provide a valid city.</div>
                         </div>

                         <div class="col-md-3 mb-3">
                              <label for="validationServer04">State</label>
                              <select class="custom-select is-invalid" id="validationServer04" required>
                                   <option selected disabled value="">Choose...</option>
                                   <option>...</option>
                              </select>
                              <div class="invalid-feedback">Please select a valid state.</div>
                         </div>

                         <div class="col-md-3 mb-3">
                              <label for="validationServer05">Zip</label>
                              <input type="text" class="form-control is-invalid" id="validationServer05" required />
                              <div class="invalid-feedback">Please provide a valid zip.</div>
                         </div>

                    </div>

                    <div class="form-group">
                         <div class="form-check">
                              <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" required />
                              <label class="form-check-label" for="invalidCheck3">Agree to terms and conditions</label>
                              <div class="invalid-feedback">You must agree before submitting.</div>
                         </div>
                    </div>

                    <button class="btn btn-primary" type="submit">Submit form</button>

               </form>

          );

     }

     render() {

          return this.owner()
          //return this.register()

          /**/

     }

}

export default Panel;
