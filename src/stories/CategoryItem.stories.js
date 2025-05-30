import CategoryItem from "../components/CategoryItem";

export default {
    title: 'CategoryItem',
    component: CategoryItem,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
      isSelected: { control: 'boolean', if: { arg: 'isOption' } },
    },
};

/** CategoryItem used to show thread's category, use \<p\> tag */
export const Text = {
  args: {
    category: 'Learning',
    isOption: false,
  },
}

/** CategoryItem used to be clickable button to filter threads, use \<input\> tag */
export const Radio = {
  args: {
    category: 'Learning',
    isOption: true,
    isSelected: true,
  },
}
