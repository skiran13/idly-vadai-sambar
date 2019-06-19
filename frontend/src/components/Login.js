import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import Particles from 'react-particles-js';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      message: '',
      err: '',
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post('http://localhost:8080/login', {
        email,
        password,
      })
      .then(result => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem(
          'jwtToken'
        );
        localStorage.setItem('data', result.data.Restaurant);
        this.props.login(result.data.Restaurant);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          this.setState({ err: error.response.data.msg });
        }
      });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <style jsx global>{`
          .login-form .ant-input-affix-wrapper .ant-input-prefix,
          .ant-input-affix-wrapper .ant-input-suffix {
            color: #fff !important;
          }
          .login-form .ant-input,
          .login-form .ant-input:focus,
          .login-form .ant-input:hover {
            background-color: #595f66 !important;
            border-color: transparent !important;
            color: #fff !important;
          }
          .ant-btn:hover {
            border-color: #fff !important;
          }
          internal-autofill-previewed,
          input:-internal-autofill-selected,
          textarea:-internal-autofill-previewed,
          textarea:-internal-autofill-selected,
          select:-internal-autofill-previewed,
          select:-internal-autofill-selected {
            box-shadow: inset 0 0 0px 9999px #00284f;
          }
        `}</style>
        <Particles
          params={{
            particles: {
              number: {
                value: 24,
                density: {
                  enable: true,
                  value_area: 473.4885849793636,
                },
              },
              color: {
                value: '#ffffff',
              },
              shape: {
                type: 'circle',
                stroke: {
                  width: 0,
                  color: '#000000',
                },
                polygon: {
                  nb_sides: 5,
                },
                image: {
                  src: 'img/github.svg',
                  width: 100,
                  height: 100,
                },
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false,
                },
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: {
                  enable: false,
                  mode: 'repulse',
                },
                onclick: {
                  enable: true,
                  mode: 'push',
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1,
                  },
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
                push: {
                  particles_nb: 4,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
            retina_detect: true,
          }}
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100vw',
            height: '100vh',
            zIndex: '1',
          }}
        />
        <Form
          style={{
            maxWidth: '350px',
            alignSelf: 'center',
            backgroundColor: '#34383d',
            padding: '25px',
            borderRadius: '4px',
            width: '92%',
            fontFamily: 'sans-serif',
            zIndex: '2',
          }}
          onSubmit={this.onSubmit}
          className='login-form'
        >
          <h2 style={{ marginBottom: '25px', color: '#fff' }}>Login</h2>
          <Form.Item>
            <Input
              prefix={<Icon type='user' />}
              name='email'
              onChange={this.onChange}
              value={email}
              placeholder='Email ID'
              size='large'
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type='lock' />}
              name='password'
              onChange={this.onChange}
              value={password}
              type='password'
              placeholder='Password'
              size='large'
            />
          </Form.Item>
          <Form.Item
            style={{
              color: '#fff',
              marginBottom: 0,
            }}
            validateStatus={this.state.err != '' ? 'error' : undefined}
            help={this.state.err != '' ? this.state.err : undefined}
          >
            <Button
              htmlType='submit'
              size='large'
              className='login-form-button'
              style={{
                width: '100%',
                backgroundColor: '#595f66',
                color: 'white',
                marginBottom: '10px',
              }}
            >
              Log in
            </Button>

            <Link to='/register' style={{ color: '#fff' }}>
              Register
            </Link>
            <Link to='/forgot' style={{ color: '#fff', float: 'right' }}>
              Forgot password
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Login;
