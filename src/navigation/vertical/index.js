const navigation = () => {
  return [
    {
      title: 'Admins',
      icon: 'tabler:user',
      path: '/dashboards/admins'
    },
    {
      sectionTitle: 'Apps & Pages'
    },
    {
      title: 'Pages',
      icon: 'tabler:file',
      children: [
        {
          title: 'User Profile',
          children: [
            {
              title: 'Profile',
              path: '/pages/user-profile/profile'
            },
            {
              title: 'Teams',
              path: '/pages/user-profile/teams'
            },
            {
              title: 'Projects',
              path: '/pages/user-profile/projects'
            },
            {
              title: 'Connections',
              path: '/pages/user-profile/connections'
            }
          ]
        },
        {
          title: 'Account Settings',
          children: [
            {
              title: 'Account',
              path: '/pages/account-settings/account'
            },
            {
              title: 'Security',
              path: '/pages/account-settings/security'
            },
            {
              title: 'Billing',
              path: '/pages/account-settings/billing'
            },
            {
              title: 'Notifications',
              path: '/pages/account-settings/notifications'
            },
            {
              title: 'Connections',
              path: '/pages/account-settings/connections'
            }
          ]
        },
        {
          title: 'FAQ',
          path: '/pages/faq'
        },
        {
          title: 'Help Center',
          path: '/pages/help-center'
        },
        {
          title: 'Pricing',
          path: '/pages/pricing'
        },
        {
          title: 'Miscellaneous',
          children: [
            {
              openInNewTab: true,
              title: 'Coming Soon',
              path: '/pages/misc/coming-soon'
            },
            {
              openInNewTab: true,
              title: 'Under Maintenance',
              path: '/pages/misc/under-maintenance'
            },
            {
              openInNewTab: true,
              title: 'Page Not Found - 404',
              path: '/pages/misc/404-not-found'
            },
            {
              openInNewTab: true,
              title: 'Not Authorized - 401',
              path: '/pages/misc/401-not-authorized'
            },
            {
              openInNewTab: true,
              title: 'Server Error - 500',
              path: '/pages/misc/500-server-error'
            }
          ]
        }
      ]
    },
    {
      title: 'Auth Pages',
      icon: 'tabler:lock',
      children: [
        {
          title: 'Login',
          children: [
            {
              openInNewTab: true,
              title: 'Login v1',
              path: '/pages/auth/login-v1'
            },
            {
              openInNewTab: true,
              title: 'Login v2',
              path: '/pages/auth/login-v2'
            },
            {
              openInNewTab: true,
              title: 'Login With AppBar',
              path: '/pages/auth/login-with-appbar'
            }
          ]
        },
        {
          title: 'Register',
          children: [
            {
              openInNewTab: true,
              title: 'Register v1',
              path: '/pages/auth/register-v1'
            },
            {
              openInNewTab: true,
              title: 'Register v2',
              path: '/pages/auth/register-v2'
            },
            {
              openInNewTab: true,
              title: 'Register Multi-Steps',
              path: '/pages/auth/register-multi-steps'
            }
          ]
        },
        {
          title: 'Verify Email',
          children: [
            {
              openInNewTab: true,
              title: 'Verify Email v1',
              path: '/pages/auth/verify-email-v1'
            },
            {
              openInNewTab: true,
              title: 'Verify Email v2',
              path: '/pages/auth/verify-email-v2'
            }
          ]
        },
        {
          title: 'Forgot Password',
          children: [
            {
              openInNewTab: true,
              title: 'Forgot Password v1',
              path: '/pages/auth/forgot-password-v1'
            },
            {
              openInNewTab: true,
              title: 'Forgot Password v2',
              path: '/pages/auth/forgot-password-v2'
            }
          ]
        },
        {
          title: 'Reset Password',
          children: [
            {
              openInNewTab: true,
              title: 'Reset Password v1',
              path: '/pages/auth/reset-password-v1'
            },
            {
              openInNewTab: true,
              title: 'Reset Password v2',
              path: '/pages/auth/reset-password-v2'
            }
          ]
        },
        {
          title: 'Two Steps',
          children: [
            {
              openInNewTab: true,
              title: 'Two Steps v1',
              path: '/pages/auth/two-steps-v1'
            },
            {
              openInNewTab: true,
              title: 'Two Steps v2',
              path: '/pages/auth/two-steps-v2'
            }
          ]
        }
      ]
    },
    {
      title: 'Wizard Examples',
      icon: 'tabler:forms',
      children: [
        {
          title: 'Checkout',
          path: '/pages/wizard-examples/checkout'
        },
        {
          title: 'Property Listing',
          path: '/pages/wizard-examples/property-listing'
        },
        {
          title: 'Create Deal',
          path: '/pages/wizard-examples/create-deal'
        }
      ]
    },
    {
      icon: 'tabler:square',
      title: 'Dialog Examples',
      path: '/pages/dialog-examples'
    },
    {
      sectionTitle: 'Forms & Tables'
    },
    {
      title: 'Form Elements',
      icon: 'tabler:toggle-left',
      children: [
        {
          title: 'Text Field',
          path: '/forms/form-elements/text-field'
        },
        {
          title: 'Select',
          path: '/forms/form-elements/select'
        },
        {
          title: 'Checkbox',
          path: '/forms/form-elements/checkbox'
        },
        {
          title: 'Radio',
          path: '/forms/form-elements/radio'
        },
        {
          title: 'Custom Inputs',
          path: '/forms/form-elements/custom-inputs'
        },
        {
          title: 'Textarea',
          path: '/forms/form-elements/textarea'
        },
        {
          title: 'Autocomplete',
          path: '/forms/form-elements/autocomplete'
        },
        {
          title: 'Date Pickers',
          path: '/forms/form-elements/pickers'
        },
        {
          title: 'Switch',
          path: '/forms/form-elements/switch'
        },
        {
          title: 'File Uploader',
          path: '/forms/form-elements/file-uploader'
        },
        {
          title: 'Editor',
          path: '/forms/form-elements/editor'
        },
        {
          title: 'Slider',
          path: '/forms/form-elements/slider'
        },
        {
          title: 'Input Mask',
          path: '/forms/form-elements/input-mask'
        }
      ]
    },
    {
      icon: 'tabler:layout-navbar',
      title: 'Form Layouts',
      path: '/forms/form-layouts'
    },
    {
      title: 'Form Validation',
      path: '/forms/form-validation',
      icon: 'tabler:checkbox'
    },
    {
      title: 'Form Wizard',
      path: '/forms/form-wizard',
      icon: 'tabler:text-wrap-disabled'
    }
  ]
}

export default navigation
