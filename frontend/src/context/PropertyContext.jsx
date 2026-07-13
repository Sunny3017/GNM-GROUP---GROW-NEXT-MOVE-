import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [properties, setProperties] = useState([]);
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [listingType, setListingType] = useState('sale'); // Default to 'sale'
    const [tenantType, setTenantType] = useState('family'); // Default to 'family'

    const fetchProperties = async (params = {}) => {
        setLoading(true);
        try {
            // Clean up params: remove undefined values
            const requestParams = {};
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
                    requestParams[key] = params[key];
                }
            });
            
            // Determine the listingType to use: if params explicitly provides it (even null), use it; otherwise use default
            let effectiveListingType;
            if (params.listingType === null) {
                effectiveListingType = null;
            } else if (params.listingType !== undefined) {
                effectiveListingType = params.listingType;
            } else {
                effectiveListingType = listingType;
            }
            
            // Only include listingType if it's not null
            if (effectiveListingType !== null) {
                requestParams.listingType = effectiveListingType;
            }
            
            // Only include tenantType if listingType is 'rent'
            if (effectiveListingType === 'rent') {
                requestParams.tenantType = params.tenantType || tenantType;
            } else {
                // Remove tenantType if present
                delete requestParams.tenantType;
            }
            
            console.log('Fetching properties with params:', requestParams);
            const { data } = await axios.get('/api/properties', { 
                params: requestParams
            });
            setProperties(data.properties);
            setPagination({ page: data.page, pages: data.pages, total: data.total });
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const fetchFeaturedProperties = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/properties/featured');
            setFeaturedProperties(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching featured properties:', error);
            setLoading(false);
        }
    };

    const getPropertyBySlug = async (slug) => {
        try {
            const { data } = await axios.get(`/api/properties/slug/${slug}`);
            return data;
        } catch (error) {
            console.error('Error fetching property by slug:', error);
            return null;
        }
    };

    const searchProperties = async (keyword) => {
        try {
            const { data } = await axios.get(`/api/properties/search?keyword=${keyword}`);
            return data;
        } catch (error) {
            console.error('Error searching properties:', error);
            return [];
        }
    };

    useEffect(() => {
        fetchFeaturedProperties();
    }, []);

    return (
        <PropertyContext.Provider value={{ 
            properties, 
            featuredProperties, 
            loading, 
            error, 
            pagination,
            listingType,
            setListingType,
            tenantType,
            setTenantType,
            fetchProperties, 
            fetchFeaturedProperties,
            getPropertyBySlug,
            searchProperties
        }}>
            {children}
        </PropertyContext.Provider>
    );
};
