import get from "lodash/get";

// DMARC records as defined here:
//    http://www.dmarc.org/draft-dmarc-base-00-02.txt in Appendix C

export const getMetaData = (obj: any) => ({
  orgName: get(obj, "feedback.report_metadata.org_name"),
  email: get(obj, "feedback.report_metadata.email"),
  extraContactInfo: get(obj, "feedback.report_metadata.extra_contact_info"),
  reportID: get(obj, "feedback.report_metadata.report_id"),
  dateRangeBegin: get(obj, "feedback.report_metadata.date_range/begin"), // EPOC Date
  dateRangeEnd: get(obj, "feedback.report_metadata.date_range/end"), // EPOC Date
});

export const getPolicy = (obj: any) => ({
  domain: get(obj, "feedback.policy_published.domain"),
  adkim: get(obj, "feedback.policy_published.adkim"),
  aspf: get(obj, "feedback.policy_published.aspf"),
  p: get(obj, "feedback.policy_published.p"),
  pct: get(obj, "feedback.policy_published.pct"),
});

export const getRecords = (obj: any): Array<any> =>
  get(obj, "feedback.record", []).map((record: any) => ({
    source_ip: get(record, "row.source_ip"),
    count: get(record, "row.count"),
    disposition: get(record, "row.policy_evaluated.disposition"),
    dkim: get(record, "row.policy_evaluated.dkim"),
    spf: get(record, "row.policy_evaluated.spf"),
    type: get(record, "row.policy_evaluated.reason.type"),
    comment: get(record, "row.policy_evaluated.reason.comment"),
    header_from: get(record, "identifiers.header_from"),
    dkim_domain: get(record, "auth_results.dkim.domain"),
    dkim_result: get(record, "auth_results.dkim.result"),
    dkim_hresult: get(record, "auth_results.dkim.human_result"),
    spf_domain: get(record, "auth_results.spf.domain"),
    spf_result: get(record, "auth_results.spf.result"),
  }));
