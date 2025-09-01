'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const CustomerForm = () => {
  const router = useRouter();

const [formData, setFormData] = useState({
  CNT_CHILDREN: '',
  AMT_INCOME_TOTAL: '',
  AMT_CREDIT: '',
  AMT_ANNUITY: '',
  DAYS_BIRTH: '',
  DAYS_EMPLOYED: '',
  OWN_CAR_AGE: '',
  REGION_RATING_CLIENT: '',
  REGION_RATING_CLIENT_W_CITY: '',
  EXT_SOURCE_1: '',
  EXT_SOURCE_2: '',
  EXT_SOURCE_3: '',
  BUREAU_COUNT: '',
  PREVAPP_COUNT: '',
  POS_COUNT: '',
  INST_COUNT: '',
  CC_COUNT: '',
  CODE_GENDER: '',
  FLAG_OWN_CAR: '',
  FLAG_OWN_REALTY: '',
  NAME_INCOME_TYPE: '',
  NAME_EDUCATION_TYPE: '',
  NAME_FAMILY_STATUS: '',
  NAME_HOUSING_TYPE: '',
  OCCUPATION_TYPE: ''
});


  const [isSubmitting, setIsSubmitting] = useState(false);
const handleDateChange = (e) => {
  const dob = new Date(e.target.value);
  const today = new Date();
  const diffDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
  
  setFormData(prev => ({
    ...prev,
    DAYS_BIRTH: -diffDays // Store as negative days like original dataset
  }));
};

const handleChange = (e) => {
  const { name, value, type } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
  }));
};


  const handleSubmit = async () => {
    // Basic validation for required fields
    const requiredFields = ['CODE_GENDER', 'FLAG_OWN_CAR', 'FLAG_OWN_REALTY', 'NAME_INCOME_TYPE', 'NAME_EDUCATION_TYPE', 'NAME_FAMILY_STATUS', 'NAME_HOUSING_TYPE', 'OCCUPATION_TYPE'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch('http://localhost:3001/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
       
      
      // Reset form
      setFormData({
        CODE_GENDER: '',
        FLAG_OWN_CAR: '',
        FLAG_OWN_REALTY: '',
        NAME_INCOME_TYPE: '',
        NAME_EDUCATION_TYPE: '',
        NAME_FAMILY_STATUS: '',
        NAME_HOUSING_TYPE: '',
        OCCUPATION_TYPE: '',
        CNT_CHILDREN: 0,
        AMT_INCOME_TOTAL: 0,
        AMT_CREDIT: 0,
        AMT_ANNUITY: 0,
        DAYS_BIRTH: 0,
        DAYS_EMPLOYED: 0,
        OWN_CAR_AGE: 0,
        REGION_RATING_CLIENT: 0,
        REGION_RATING_CLIENT_W_CITY: 0,
        EXT_SOURCE_1: 0,
        EXT_SOURCE_2: 0,
        EXT_SOURCE_3: 0,
        BUREAU_COUNT: 0,
        PREVAPP_COUNT: 0,
        POS_COUNT: 0,
        INST_COUNT: 0,
        CC_COUNT: 0
      });
      router.push('/score');
    } catch (err) {
      console.error(err);
      alert('Failed to add customer');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Customer Information Form</h1>
            <p className="text-blue-100 mt-2">Complete customer profile and financial details</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Personal Information</h2>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Gender *</label>
                  <select 
                    name="CODE_GENDER" 
                    value={formData.CODE_GENDER} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-400 text-black"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Education Level *</label>
                  <select 
                    name="NAME_EDUCATION_TYPE" 
                    value={formData.NAME_EDUCATION_TYPE} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-400"
                    required
                  >
                    <option value="">Select Education Level</option>
                    <option value="Lower secondary">Lower Secondary</option>
                    <option value="Secondary / secondary special">Secondary / Secondary Special</option>
                    <option value="Incomplete higher">Incomplete Higher</option>
                    <option value="Higher education">Higher Education</option>
                    <option value="Academic degree">Academic Degree</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Family Status *</label>
                  <select 
                    name="NAME_FAMILY_STATUS" 
                    value={formData.NAME_FAMILY_STATUS} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-400"
                    required
                  >
                    <option value="">Select Family Status</option>
                    <option value="Single / not married">Single / Not Married</option>
                    <option value="Married">Married</option>
                    <option value="Civil marriage">Civil Marriage</option>
                    <option value="Widow">Widow</option>
                    <option value="Separated">Separated</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Number of Children</label>
                  <input 
                    type="number" 
                    name="CNT_CHILDREN" 
                    value={formData.CNT_CHILDREN} 
                    onChange={handleChange}
                    placeholder="Enter number of children"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="0"
                    max="20"
                  />
                </div>

                <div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">Date of Birth *</label>
  <input
    type="date"
    name="DOB"
    onChange={handleDateChange}
    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
    required
  />
</div>


                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Days Employed</label>
                  <input 
                    type="number" 
                    name="DAYS_EMPLOYED" 
                    value={formData.DAYS_EMPLOYED} 
                    onChange={handleChange}
                    placeholder="Enter employment duration in days"
                    className="w-full px-4 py-3  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                  />
                  <p className="text-xs text-gray-500">Negative value for employed, positive for unemployed</p>
                </div>
              </div>

              {/* Financial & Property Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Financial & Property Information</h2>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Owns Car *</label>
                  <select 
                    name="FLAG_OWN_CAR" 
                    value={formData.FLAG_OWN_CAR} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-400"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Car Age (Years)</label>
                  <input 
                    type="number" 
                    name="OWN_CAR_AGE" 
                    value={formData.OWN_CAR_AGE} 
                    onChange={handleChange}
                    placeholder="Enter car age in years"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="0"
                    disabled={formData.FLAG_OWN_CAR === 'No'}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Owns Real Estate *</label>
                  <select 
                    name="FLAG_OWN_REALTY" 
                    value={formData.FLAG_OWN_REALTY} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-400"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Housing Type *</label>
                  <select 
                    name="NAME_HOUSING_TYPE" 
                    value={formData.NAME_HOUSING_TYPE} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-400"
                    required
                  >
                    <option value="">Select Housing Type</option>
                    <option value="House / apartment">House / Apartment</option>
                    <option value="With parents">With Parents</option>
                    <option value="Municipal apartment">Municipal Apartment</option>
                    <option value="Rented apartment">Rented Apartment</option>
                    <option value="Office apartment">Office Apartment</option>
                    <option value="Co-op apartment">Co-op Apartment</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Income Type *</label>
                  <select 
                    name="NAME_INCOME_TYPE" 
                    value={formData.NAME_INCOME_TYPE} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-400"
                    required
                  >
                    <option value="">Select Income Type</option>
                    <option value="Working">Working</option>
                    <option value="Commercial associate">Commercial Associate</option>
                    <option value="Pensioner">Pensioner</option>
                    <option value="State servant">State Servant</option>
                    <option value="Student">Student</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Occupation Type *</label>
                  <select 
                    name="OCCUPATION_TYPE" 
                    value={formData.OCCUPATION_TYPE} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-400"
                    required
                  >
                    <option value="">Select Occupation</option>
                    <option value="Laborers">Laborers</option>
                    <option value="Core staff">Core Staff</option>
                    <option value="Accountants">Accountants</option>
                    <option value="Managers">Managers</option>
                    <option value="Drivers">Drivers</option>
                    <option value="Sales staff">Sales Staff</option>
                    <option value="Cleaning staff">Cleaning Staff</option>
                    <option value="Cooking staff">Cooking Staff</option>
                    <option value="Private service staff">Private Service Staff</option>
                    <option value="Medicine staff">Medicine Staff</option>
                    <option value="Security staff">Security Staff</option>
                    <option value="High skill tech staff">High Skill Tech Staff</option>
                    <option value="IT staff">IT Staff</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Details Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Financial Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Annual Income</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input 
                      type="number" 
                      name="AMT_INCOME_TOTAL" 
                      value={formData.AMT_INCOME_TOTAL} 
                      onChange={handleChange}
                      placeholder="Enter annual income"
                      className="w-full pl-8 pr-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Credit Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input 
                      type="number" 
                      name="AMT_CREDIT" 
                      value={formData.AMT_CREDIT} 
                      onChange={handleChange}
                      placeholder="Enter credit amount"
                      className="w-full pl-8 pr-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Annuity Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input 
                      type="number" 
                      name="AMT_ANNUITY" 
                      value={formData.AMT_ANNUITY} 
                      onChange={handleChange}
                      placeholder="Enter annuity amount"
                      className="w-full pl-8 pr-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Regional & External Scores Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Regional & External Scores</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Region Rating (Client)</label>
                  <input 
                    type="number" 
                    name="REGION_RATING_CLIENT" 
                    value={formData.REGION_RATING_CLIENT} 
                    onChange={handleChange}
                    placeholder="1-3"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="1"
                    max="3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Region Rating (With City)</label>
                  <input 
                    type="number" 
                    name="REGION_RATING_CLIENT_W_CITY" 
                    value={formData.REGION_RATING_CLIENT_W_CITY} 
                    onChange={handleChange}
                    placeholder="1-3"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="1"
                    max="3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">External Source 1</label>
                  <input 
                    type="number" 
                    name="EXT_SOURCE_1" 
                    value={formData.EXT_SOURCE_1} 
                    onChange={handleChange}
                    placeholder="0.0 - 1.0"
                    step="0.01"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="0"
                    max="1"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">External Source 2</label>
                  <input 
                    type="number" 
                    name="EXT_SOURCE_2" 
                    value={formData.EXT_SOURCE_2} 
                    onChange={handleChange}
                    placeholder="0.0 - 1.0"
                    step="0.01"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="0"
                    max="1"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">External Source 3</label>
                  <input 
                    type="number" 
                    name="EXT_SOURCE_3" 
                    value={formData.EXT_SOURCE_3} 
                    onChange={handleChange}
                    placeholder="0.0 - 1.0"
                    step="0.01"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="0"
                    max="1"
                  />
                </div>
              </div>
            </div>

            {/* Credit History Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Credit History & Bureau Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Bureau Count</label>
                  <input 
                    type="number" 
                    name="BUREAU_COUNT" 
                    value={formData.BUREAU_COUNT} 
                    onChange={handleChange}
                    placeholder="Number of bureau queries"
                    className="w-full px-4 py-3  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Previous Applications</label>
                  <input 
                    type="number" 
                    name="PREVAPP_COUNT" 
                    value={formData.PREVAPP_COUNT} 
                    onChange={handleChange}
                    placeholder="Previous applications count"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">POS Count</label>
                  <input 
                    type="number" 
                    name="POS_COUNT" 
                    value={formData.POS_COUNT} 
                    onChange={handleChange}
                    placeholder="POS cash balance count"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Installment Count</label>
                  <input 
                    type="number" 
                    name="INST_COUNT" 
                    value={formData.INST_COUNT} 
                    onChange={handleChange}
                    placeholder="Installment payments count"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Credit Card Count</label>
                  <input 
                    type="number" 
                    name="CC_COUNT" 
                    value={formData.CC_COUNT} 
                    onChange={handleChange}
                    placeholder="Credit card balance count"
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6">
              <button 
                type="button" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding Customer...</span> 
                  </div>
                ) : (
                  'Add Customer'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Form Guidelines</h3>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li>• Fields marked with * are required</li>
                <li>• Days Birth should be negative (e.g., -12000 for ~33 years)</li>
                <li>• Days Employed: negative for employed, positive for unemployed</li>
                <li>• External Sources should be decimal values between 0.0 and 1.0</li>
                <li>• Car age is automatically disabled if "Owns Car" is set to "No"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;