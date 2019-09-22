import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from '../../components/Container';
import api from '../../services/api';

import { Loading, Owner, IssueList, Filters, Paginacao } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    state: 'open',
    per_page: 5,
    page: 1,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.getData();
  }

  getData = async () => {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { state, per_page, page } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  };

  handleSelectChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  mudaPagina = (n = 1) => {
    this.setState({ page: n });
  };

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filters>
          <div>
            <label htmlFor="filtro">
              State
              <select
                name="state"
                id="state"
                onChange={this.handleSelectChange}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="all">All</option>
              </select>
            </label>
          </div>

          <div>
            <label htmlFor="per_page">
              Per Page
              <select
                name="per_page"
                id="per_page"
                onChange={this.handleSelectChange}
              >
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="30">30</option>
              </select>
            </label>
          </div>
        </Filters>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Paginacao>
          <button onClick={() => this.mudaPagina()}>1</button>
          <span>{this.state.page}</span>
          <button onClick={() => this.mudaPagina(page + 1)}>Proxima</button>
        </Paginacao>
      </Container>
    );
  }
}
