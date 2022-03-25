// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const main = (
  projectId = process.env.GOOGLE_CLOUD_PROJECT,
  cloudRegion = 'us-central1',
  datasetId,
  consentStoreId,
  defaultConsentTtl
) => {
  // [START healthcare_patch_consent_store]
  const google = require('@googleapis/healthcare');
  const healthcare = google.healthcare({
    version: 'v1',
    auth: new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    }),
  });

  const patchConsentStore = async () => {
    // TODO(developer): uncomment these lines before running the sample
    // const cloudRegion = 'us-central1';
    // const projectId = 'adjective-noun-123';
    // const datasetId = 'my-dataset';
    // const consentStoreId = 'my-consent-store';
    // const defaultConsentTtl = '172800s' Must be at least 24 hours, specified
    // in seconds, appended with 's' character.
    const name = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/consentStores/${consentStoreId}`;
    const request = {
      name,
      updateMask: 'defaultConsentTtl',
      resource: {
        defaultConsentTtl: defaultConsentTtl,
      },
    };

    await healthcare.projects.locations.datasets.consentStores.patch(request);
    console.log(
      `Patched consent store ${consentStoreId} with default consent time-to-live ${defaultConsentTtl}`
    );
  };

  patchConsentStore();
  // [END healthcare_patch_consent_store]
};

// node patchConsentStore.js <projectId> <cloudRegion> <datasetId> <consentStoreId> <defaultConsentTtl>
main(...process.argv.slice(2));