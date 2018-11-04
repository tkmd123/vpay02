import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './product-type-wallet.reducer';
import { IProductTypeWallet } from 'app/shared/model/product-type-wallet.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductTypeWalletProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProductTypeWalletState {
  search: string;
}

export class ProductTypeWallet extends React.Component<IProductTypeWalletProps, IProductTypeWalletState> {
  state: IProductTypeWalletState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
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

  render() {
    const { productTypeWalletList, match } = this.props;
    return (
      <div>
        <h2 id="product-type-wallet-heading">
          <Translate contentKey="vpay02App.productTypeWallet.home.title">Product Type Wallets</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="vpay02App.productTypeWallet.home.createLabel">Create new Product Type Wallet</Translate>
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
                    placeholder={translate('vpay02App.productTypeWallet.home.search')}
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
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay02App.productTypeWallet.productTypeWalletUDF1">Product Type Wallet UDF 1</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay02App.productTypeWallet.productTypeWalletUDF2">Product Type Wallet UDF 2</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay02App.productTypeWallet.productTypeWalletUDF3">Product Type Wallet UDF 3</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay02App.productTypeWallet.isDeleted">Is Deleted</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay02App.productTypeWallet.productType">Product Type</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay02App.productTypeWallet.wallet">Wallet</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productTypeWalletList.map((productTypeWallet, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${productTypeWallet.id}`} color="link" size="sm">
                      {productTypeWallet.id}
                    </Button>
                  </td>
                  <td>{productTypeWallet.productTypeWalletUDF1}</td>
                  <td>{productTypeWallet.productTypeWalletUDF2}</td>
                  <td>{productTypeWallet.productTypeWalletUDF3}</td>
                  <td>{productTypeWallet.isDeleted ? 'true' : 'false'}</td>
                  <td>
                    {productTypeWallet.productType ? (
                      <Link to={`product-type/${productTypeWallet.productType.id}`}>{productTypeWallet.productType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {productTypeWallet.wallet ? (
                      <Link to={`wallet/${productTypeWallet.wallet.id}`}>{productTypeWallet.wallet.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${productTypeWallet.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productTypeWallet.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productTypeWallet.id}/delete`} color="danger" size="sm">
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
      </div>
    );
  }
}

const mapStateToProps = ({ productTypeWallet }: IRootState) => ({
  productTypeWalletList: productTypeWallet.entities
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
)(ProductTypeWallet);
