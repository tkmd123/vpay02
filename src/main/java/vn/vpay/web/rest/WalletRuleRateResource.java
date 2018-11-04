package vn.vpay.web.rest;

import com.codahale.metrics.annotation.Timed;
import vn.vpay.domain.WalletRuleRate;
import vn.vpay.repository.WalletRuleRateRepository;
import vn.vpay.repository.search.WalletRuleRateSearchRepository;
import vn.vpay.web.rest.errors.BadRequestAlertException;
import vn.vpay.web.rest.util.HeaderUtil;
import vn.vpay.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing WalletRuleRate.
 */
@RestController
@RequestMapping("/api")
public class WalletRuleRateResource {

    private final Logger log = LoggerFactory.getLogger(WalletRuleRateResource.class);

    private static final String ENTITY_NAME = "walletRuleRate";

    private final WalletRuleRateRepository walletRuleRateRepository;

    private final WalletRuleRateSearchRepository walletRuleRateSearchRepository;

    public WalletRuleRateResource(WalletRuleRateRepository walletRuleRateRepository, WalletRuleRateSearchRepository walletRuleRateSearchRepository) {
        this.walletRuleRateRepository = walletRuleRateRepository;
        this.walletRuleRateSearchRepository = walletRuleRateSearchRepository;
    }

    /**
     * POST  /wallet-rule-rates : Create a new walletRuleRate.
     *
     * @param walletRuleRate the walletRuleRate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new walletRuleRate, or with status 400 (Bad Request) if the walletRuleRate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/wallet-rule-rates")
    @Timed
    public ResponseEntity<WalletRuleRate> createWalletRuleRate(@Valid @RequestBody WalletRuleRate walletRuleRate) throws URISyntaxException {
        log.debug("REST request to save WalletRuleRate : {}", walletRuleRate);
        if (walletRuleRate.getId() != null) {
            throw new BadRequestAlertException("A new walletRuleRate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WalletRuleRate result = walletRuleRateRepository.save(walletRuleRate);
        walletRuleRateSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/wallet-rule-rates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /wallet-rule-rates : Updates an existing walletRuleRate.
     *
     * @param walletRuleRate the walletRuleRate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated walletRuleRate,
     * or with status 400 (Bad Request) if the walletRuleRate is not valid,
     * or with status 500 (Internal Server Error) if the walletRuleRate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/wallet-rule-rates")
    @Timed
    public ResponseEntity<WalletRuleRate> updateWalletRuleRate(@Valid @RequestBody WalletRuleRate walletRuleRate) throws URISyntaxException {
        log.debug("REST request to update WalletRuleRate : {}", walletRuleRate);
        if (walletRuleRate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WalletRuleRate result = walletRuleRateRepository.save(walletRuleRate);
        walletRuleRateSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, walletRuleRate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /wallet-rule-rates : get all the walletRuleRates.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of walletRuleRates in body
     */
    @GetMapping("/wallet-rule-rates")
    @Timed
    public ResponseEntity<List<WalletRuleRate>> getAllWalletRuleRates(Pageable pageable) {
        log.debug("REST request to get a page of WalletRuleRates");
        Page<WalletRuleRate> page = walletRuleRateRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/wallet-rule-rates");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /wallet-rule-rates/:id : get the "id" walletRuleRate.
     *
     * @param id the id of the walletRuleRate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the walletRuleRate, or with status 404 (Not Found)
     */
    @GetMapping("/wallet-rule-rates/{id}")
    @Timed
    public ResponseEntity<WalletRuleRate> getWalletRuleRate(@PathVariable Long id) {
        log.debug("REST request to get WalletRuleRate : {}", id);
        Optional<WalletRuleRate> walletRuleRate = walletRuleRateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(walletRuleRate);
    }

    /**
     * DELETE  /wallet-rule-rates/:id : delete the "id" walletRuleRate.
     *
     * @param id the id of the walletRuleRate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/wallet-rule-rates/{id}")
    @Timed
    public ResponseEntity<Void> deleteWalletRuleRate(@PathVariable Long id) {
        log.debug("REST request to delete WalletRuleRate : {}", id);

        walletRuleRateRepository.deleteById(id);
        walletRuleRateSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/wallet-rule-rates?query=:query : search for the walletRuleRate corresponding
     * to the query.
     *
     * @param query the query of the walletRuleRate search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/wallet-rule-rates")
    @Timed
    public ResponseEntity<List<WalletRuleRate>> searchWalletRuleRates(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of WalletRuleRates for query {}", query);
        Page<WalletRuleRate> page = walletRuleRateSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/wallet-rule-rates");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
