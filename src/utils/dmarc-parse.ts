import get from "lodash/get";

// DMARC records as defined here:
//    http://www.dmarc.org/draft-dmarc-base-00-02.txt in Appendix C

const convert = (
  obj: Object,
  path: string,
  parseFunction?: (string: string, ...args: any) => any
) => {
  const value = get(obj, path);

  if (parseFunction && value) {
    return parseFunction(value);
  }

  return value;
};

type MetaData = {
  orgName: string;
  email: string;
  extraContactInfo: string;
  reportID: string;
  dateRangeBegin: Date;
  dateRangeEnd: Date;
};

export const getMetaData = (obj: any): MetaData => ({
  orgName: get(obj, "feedback.report_metadata.org_name"),
  email: get(obj, "feedback.report_metadata.email"),
  extraContactInfo: get(obj, "feedback.report_metadata.extra_contact_info"),
  reportID: get(obj, "feedback.report_metadata.report_id"),
  dateRangeBegin: convert(
    obj,
    "feedback.report_metadata.date_range.begin",
    (n: any) => new Date(parseInt(n) * 1000)
  ),
  dateRangeEnd: convert(
    obj,
    "feedback.report_metadata.date_range.end",
    (n: any) => new Date(parseInt(n) * 1000)
  ),
});

type Policy = {
  domain: string;
  adkim: string;
  aspf: string;
  p: string;
  pct: string;
};

export const getPolicy = (obj: any): Policy => ({
  domain: get(obj, "feedback.policy_published.domain"),
  adkim: get(obj, "feedback.policy_published.adkim"),
  aspf: get(obj, "feedback.policy_published.aspf"),
  p: get(obj, "feedback.policy_published.p"),
  pct: get(obj, "feedback.policy_published.pct"),
});

type Record = {
  source_ip: string;
  count: string;
  disposition: string;
  dkim: string;
  spf: string;
  type: string;
  comment: string;
  header_from: string;
  dkim_domain: string;
  dkim_result: string;
  dkim_hresult: string;
  spf_domain: string;
  spf_result: string;
};

export const getRecords = (obj: any): Record[] =>
  get(obj, "feedback.record", []).map(
    (record: any): Record => ({
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
    })
  );
