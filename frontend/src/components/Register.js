import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import axios from 'axios';
import { Form, Icon, Input, Button, Layout, Select } from 'antd';
const { Header, Content, Footer } = Layout;
const InputGroup = Input.Group;
const Option = Select.Option;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      password: '',
      restaurantId: '',
      email: '',
      name: '',
      imageUrl: '',
      latitude: '',
      longitude: '',
      opensAt: '',
      closesAt: '',
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      city,
      password,
      restaurantId,
      email,
      name,
      imageUrl,
      latitude,
      longitude,
      opensAt,
      closesAt,
    } = this.state;
    axios
      .post('http://localhost:8080/register', {
        city,
        password,
        restaurantId,
        email,
        name,
        imageUrl,
        latitude,
        longitude,
        opensAt,
        closesAt,
      })
      .then(result => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      city,
      password,
      restaurantId,
      email,
      name,
      imageUrl,
      latitude,
      longitude,
      opensAt,
      closesAt,
    } = this.state;
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
          .custom-form .ant-input-affix-wrapper .ant-input-prefix,
          .ant-input-affix-wrapper .ant-input-suffix {
            color: #fff !important;
          }
          .custom-form .ant-input,
          .custom-form .ant-input:focus,
          .custom-form .ant-input:hover,
          .custom-form .ant-select-arrow {
            background-color: #595f66 !important;
            border-color: transparent !important;
            color: #fff !important;
          }
          .custom-form .ant-select-selection {
            background-color: #001f3d !important;
            color: #fff !important;
            border-color: transparent !important;
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
            border-color: transparent !important;
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
            maxWidth: '500px',
            alignSelf: 'center',
            backgroundColor: '#34383d',
            padding: '25px',
            borderRadius: '4px',
            width: '92%',
            fontFamily: 'sans-serif',
            zIndex: '2',
          }}
          onSubmit={this.onSubmit}
          className='custom-form'
        >
          <h2 style={{ marginBottom: '25px', color: '#fff' }}>Register</h2>
          <Form.Item>
            <Input
              size='large'
              prefix={<Icon type='user' />}
              name='name'
              onChange={this.onChange}
              value={name}
              placeholder='Restaurant Name'
            />
          </Form.Item>

          <Form.Item>
            <Input
              size='large'
              name='restaurantId'
              prefix={<Icon type='info-circle' />}
              onChange={this.onChange}
              value={restaurantId}
              placeholder='Restaurant ID'
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='city'
              prefix={<Icon type='environment' />}
              onChange={this.onChange}
              value={city}
              placeholder='City'
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='imageUrl'
              prefix={<Icon type='picture' />}
              onChange={this.onChange}
              value={imageUrl}
              placeholder='Image URL'
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='latitude'
              prefix={<Icon type='environment' />}
              onChange={this.onChange}
              value={latitude}
              placeholder='Latitude'
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='longitude'
              prefix={<Icon type='environment' />}
              onChange={this.onChange}
              value={longitude}
              placeholder='Longitude'
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='opensAt'
              prefix={<Icon type='clock-circle' />}
              onChange={this.onChange}
              value={opensAt}
              placeholder='Opens At'
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              name='closesAt'
              prefix={<Icon type='clock-circle' />}
              onChange={this.onChange}
              value={closesAt}
              placeholder='Closes At'
            />
          </Form.Item>
          <Form.Item>
            <Input
              size='large'
              display='flex'
              name='email'
              prefix={<Icon type='message' />}
              value={email}
              onChange={this.onChange}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type='lock' />}
              size='large'
              name='password'
              onChange={this.onChange}
              value={password}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item style={{ color: '#fff', marginBottom: 0 }}>
            <Button
              className='custom-form-button'
              style={{
                width: '100%',
                textAlign: 'center',
                position: 'center',
                backgroundColor: '#595f66',
                color: 'white',
              }}
              onClick={this.onSubmit}
            >
              Register
            </Button>
            <Link to='/' style={{ color: 'white' }}>
              Login
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Register;
