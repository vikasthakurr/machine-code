FROM python:3.11-slim

# No extra packages needed for basic Python execution
# Add numpy, etc. if you want to support data science problems
RUN useradd -m runner
USER runner

WORKDIR /sandbox
