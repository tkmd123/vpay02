import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  translate,
  ICrudSearchAction,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './pay-partner-log.reducer';
import { IPayPartnerLog } from 'app/shared/model/pay-partner-log.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPayPartnerLogProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPayPartnerLogState extends IPaginationBaseState {
  search: string;
}

export class PayPartnerLog extends React.Component<IPayPartnerLogProps, IPayPartnerLogState> {
  state: IPayPartnerLogState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { payPartnerLogList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="pay-partner-log-heading">
          <Translate contentKey="vpay02App.payPartnerLog.home.title">Pay Partner Logs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="vpay02App.payPartnerLog.home.createLabel">Create new Pay Partner Log</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('vpay02App.payPartnerLog.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogAmount')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogAmount">Pay Log Amount</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogTransRef')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogTransRef">Pay Log Trans Ref</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogUsername')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogUsername">Pay Log Username</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogProductTypeCode')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogProductTypeCode">Pay Log Product Type Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogResuleCode')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogResuleCode">Pay Log Resule Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogResuleDesc')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogResuleDesc">Pay Log Resule Desc</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogDate')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogDate">Pay Log Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogUDF1')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogUDF1">Pay Log UDF 1</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogUDF2')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogUDF2">Pay Log UDF 2</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogUDF3')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogUDF3">Pay Log UDF 3</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogUDF4')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogUDF4">Pay Log UDF 4</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('payLogUDF5')}>
                  <Translate contentKey="vpay02App.payPartnerLog.payLogUDF5">Pay Log UDF 5</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('isDeleted')}>
                  <Translate contentKey="vpay02App.payPartnerLog.isDeleted">Is Deleted</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="vpay02App.payPartnerLog.payPartner">Pay Partner</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {payPartnerLogList.map((payPartnerLog, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${payPartnerLog.id}`} color="link" size="sm">
                      {payPartnerLog.id}
                    </Button>
                  </td>
                  <td>{payPartnerLog.payLogAmount}</td>
                  <td>{payPartnerLog.payLogTransRef}</td>
                  <td>{payPartnerLog.payLogUsername}</td>
                  <td>{payPartnerLog.payLogProductTypeCode}</td>
                  <td>{payPartnerLog.payLogResuleCode}</td>
                  <td>{payPartnerLog.payLogResuleDesc}</td>
                  <td>
                    <TextFormat type="date" value={payPartnerLog.payLogDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{payPartnerLog.payLogUDF1}</td>
                  <td>{payPartnerLog.payLogUDF2}</td>
                  <td>{payPartnerLog.payLogUDF3}</td>
                  <td>{payPartnerLog.payLogUDF4}</td>
                  <td>{payPartnerLog.payLogUDF5}</td>
                  <td>{payPartnerLog.isDeleted ? 'true' : 'false'}</td>
                  <td>
                    {payPartnerLog.payPartner ? (
                      <Link to={`pay-partner/${payPartnerLog.payPartner.id}`}>{payPartnerLog.payPartner.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${payPartnerLog.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payPartnerLog.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payPartnerLog.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ payPartnerLog }: IRootState) => ({
  payPartnerLogList: payPartnerLog.entities,
  totalItems: payPartnerLog.totalItems
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayPartnerLog);
