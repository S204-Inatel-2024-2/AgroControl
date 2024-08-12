import { Outlet } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { Section, Container } from './styles'
import theme from '../styles/theme';

const Layout = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
          <Section>
            <Outlet />
          </Section>
        </Container>
      </ThemeProvider>

    </>
  )
}

export default Layout;
