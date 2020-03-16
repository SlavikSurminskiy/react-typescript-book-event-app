import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import App from './App';

import { SidebarNav } from './components/SidebarNav';

import { EventsPage } from './pages/EventsPage';
import SingleEventPage from './pages/SingleEventPage';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Container>
        <SidebarNav></SidebarNav>
        <Route exact path="/" component={App} />
        <Route path="/events" component={EventsPage} />
        <Route path="/event/:id" component={SingleEventPage} />
      </Container>
    </Router>
  )
}