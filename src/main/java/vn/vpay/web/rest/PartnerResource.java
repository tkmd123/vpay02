package vn.vpay.web.rest;

import com.codahale.metrics.annotation.Timed;
import vn.vpay.domain.Partner;
import vn.vpay.repository.PartnerRepository;
import vn.vpay.repository.search.PartnerSearchRepository;
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
 * REST controller for managing Partner.
 */
@RestController
@RequestMapping("/api")
public class PartnerResource {

    private final Logger log = LoggerFactory.getLogger(PartnerResource.class);

    private static final String ENTITY_NAME = "partner";

    private final PartnerRepository partnerRepository;

    private final PartnerSearchRepository partnerSearchRepository;

    public PartnerResource(PartnerRepository partnerRepository, PartnerSearchRepository partnerSearchRepository) {
        this.partnerRepository = partnerRepository;
        this.partnerSearchRepository = partnerSearchRepository;
    }

    /**
     * POST  /partners : Create a new partner.
     *
     * @param partner the partner to create
     * @return the ResponseEntity with status 201 (Created) and with body the new partner, or with status 400 (Bad Request) if the partner has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/partners")
    @Timed
    public ResponseEntity<Partner> createPartner(@Valid @RequestBody Partner partner) throws URISyntaxException {
        log.debug("REST request to save Partner : {}", partner);
        if (partner.getId() != null) {
            throw new BadRequestAlertException("A new partner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Partner result = partnerRepository.save(partner);
        partnerSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/partners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /partners : Updates an existing partner.
     *
     * @param partner the partner to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated partner,
     * or with status 400 (Bad Request) if the partner is not valid,
     * or with status 500 (Internal Server Error) if the partner couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/partners")
    @Timed
    public ResponseEntity<Partner> updatePartner(@Valid @RequestBody Partner partner) throws URISyntaxException {
        log.debug("REST request to update Partner : {}", partner);
        if (partner.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Partner result = partnerRepository.save(partner);
        partnerSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, partner.getId().toString()))
            .body(result);
    }

    /**
     * GET  /partners : get all the partners.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of partners in body
     */
    @GetMapping("/partners")
    @Timed
    public ResponseEntity<List<Partner>> getAllPartners(Pageable pageable) {
        log.debug("REST request to get a page of Partners");
        Page<Partner> page = partnerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/partners");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /partners/:id : get the "id" partner.
     *
     * @param id the id of the partner to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the partner, or with status 404 (Not Found)
     */
    @GetMapping("/partners/{id}")
    @Timed
    public ResponseEntity<Partner> getPartner(@PathVariable Long id) {
        log.debug("REST request to get Partner : {}", id);
        Optional<Partner> partner = partnerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(partner);
    }

    /**
     * DELETE  /partners/:id : delete the "id" partner.
     *
     * @param id the id of the partner to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/partners/{id}")
    @Timed
    public ResponseEntity<Void> deletePartner(@PathVariable Long id) {
        log.debug("REST request to delete Partner : {}", id);

        partnerRepository.deleteById(id);
        partnerSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/partners?query=:query : search for the partner corresponding
     * to the query.
     *
     * @param query the query of the partner search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/partners")
    @Timed
    public ResponseEntity<List<Partner>> searchPartners(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Partners for query {}", query);
        Page<Partner> page = partnerSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/partners");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
