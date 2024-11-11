import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Background from './Background';

const meta: Meta<typeof Background> = {
  component: Background,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LookMain: Story = {
  args: {
    look: 'main',
    children: 'Background',
  },
};

export const LookSide: Story = {
  args: {
    look: 'side',
    children: 'Background',
  },
};
