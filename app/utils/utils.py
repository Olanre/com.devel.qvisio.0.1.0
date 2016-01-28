def parseResponse(header):
   return {
        '200': 1,
        '500': 2,
        '404': 3,
        '422': 4
    }[header]

def matchResponseType(code):
    return {
        1: "Success",
        2: "Server Error",
        3: "Resource not found",
        4: "Invalid Query",
    }[code]
    
def logSourceEndPoints(url):
    return {
        'log_source': '/api/configuration/log_sources',
        'log_source_types': '/api/configuration/log_source_types',
        'log_source_protocols': '/api/configuration/log_source_protocols',
        'log_source_groups': '/api/configuration/log_source_groups'
            
    }[url]
    
def vulnerabilityEndPoints(url):
    return {
        'assets': '/api/qvm/assets',
        'filters': '/api/qvm/filters',
        'network': '/api/qvm/network',
        'vulinstances': '/api/qvm/vulninstances',
        'openservices': '/api/qvm/openservices'
            
    }[url]