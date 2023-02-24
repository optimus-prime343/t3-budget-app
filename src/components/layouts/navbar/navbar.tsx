import {
  Box,
  Burger,
  Button,
  createStyles,
  Group,
  Header,
  Paper,
  Title,
  Transition,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { openModal } from '@mantine/modals'
import Link from 'next/link'

import { BudgetForm } from '~/components/budget/budget-form'
import { ExpenseForm } from '~/components/expense/expense-form'

const HEADER_HEIGHT = 60

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false)

  const { classes } = useStyles()

  const handleAddBudget = () => {
    openModal({
      title: 'Add Budget',
      children: <BudgetForm />,
    })
  }
  const handleAddExpense = () => {
    openModal({
      title: 'Add Expense',
      children: <ExpenseForm />,
    })
  }

  const items = (
    <>
      <Button onClick={handleAddBudget}>Add Budget</Button>
      <Button onClick={handleAddExpense} variant='outline'>
        Add Expense
      </Button>
    </>
  )
  return (
    <Header className={classes.root} height={HEADER_HEIGHT} mb={8}>
      <Box className={classes.header}>
        <Link className={classes.link} href='/'>
          <Title order={4}>T3 BUDGET APP</Title>
        </Link>
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>
        <Burger
          className={classes.burger}
          onClick={toggle}
          opened={opened}
          size='sm'
        />

        <Transition duration={200} mounted={opened} transition='pop-top-right'>
          {styles => (
            <Paper className={classes.dropdown} style={styles} withBorder>
              {items}
            </Paper>
          )}
        </Transition>
      </Box>
    </Header>
  )
}

const useStyles = createStyles(theme => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingInline: theme.spacing.xl,
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}))
