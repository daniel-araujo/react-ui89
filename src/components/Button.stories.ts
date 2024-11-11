import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ThemePrimary: Story = {
  args: {
    theme: 'primary',
    children: 'Button',
  },
};

export const ThemeSecondary: Story = {
  args: {
    theme: 'secondary',
    children: 'Button',
  },
};

export const ThemeSuccess: Story = {
  args: {
    theme: 'success',
    children: 'Button',
  },
};

export const ThemeDanger: Story = {
  args: {
    theme: 'danger',
    children: 'Button',
  },
};

export const ThemeInfo: Story = {
  args: {
    theme: 'info',
    children: 'Button',
  },
};

export const ThemeWarning: Story = {
  args: {
    theme: 'warning',
    children: 'Button',
  },
};
