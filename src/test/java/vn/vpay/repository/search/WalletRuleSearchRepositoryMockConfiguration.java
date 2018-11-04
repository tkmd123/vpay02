package vn.vpay.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of WalletRuleSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class WalletRuleSearchRepositoryMockConfiguration {

    @MockBean
    private WalletRuleSearchRepository mockWalletRuleSearchRepository;

}
