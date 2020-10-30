---
title: Set up Datadog APM
kind: documentation
description: "Get Started with Datadog APM"
aliases:
    - /tracing/setup
    - /tracing/send_traces/
    - /tracing/setup/
    - /tracing/environments/
    - /tracing/setup/environment
    - /tracing/setup/first_class_dimensions
    - /tracing/getting_further/first_class_dimensions/
    - /agent/apm/
---

Configuring your application to send [traces][1] to Datadog involves two main steps:

- Configuring the Datadog Agent for APM.

- Adding the Datadog Tracing Library to your code.

These steps are both required for all non-[AWS Lambda][2] environments.  Traces are sent from an application instrumented with a Datadog Tracing Library to the Datadog Agent, and from the Datadog Agent to Datadog.

Depending on your environment, there may be APM-specific configurations required on both the Tracer and Agent to ensure that traces can be properly received, so ensure you have followed instructions for both components.

## For setup instructions, please choose your language below

{{< partial name="apm/apm-languages.html" >}}

To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][3].

[1]: /tracing/visualization/#trace
[2]: /tracing/setup_overview/serverless_functions/
[3]: /developers/libraries/#apm-tracing-client-libraries