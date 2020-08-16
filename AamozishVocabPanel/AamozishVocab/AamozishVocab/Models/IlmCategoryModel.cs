using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AamozishVocab.Models
{
    public class IlmCategoryModel
    {
        [BsonId]
        public ObjectId _id { get; set; }
        [BsonElement]
        public Guid Id { get; set; }        
        [BsonElement]
        public Nullable<int> SerialNo { get; set; }
        [BsonElement]
        public string Category_En { get; set; }
        [BsonElement]
        public string Category_Hi { get; set; }
        [BsonElement]
        public string Category_Ur { get; set; }
        [BsonElement]
        public string Descr_En { get; set; }
        [BsonElement]
        public string Descr_Hi { get; set; }
        [BsonElement]
        public string Descr_Ur { get; set; }
        [BsonElement]
        public Nullable<bool> IsActive { get; set; }
        [BsonElement]
        public Nullable<System.Guid> CreatedBy { get; set; }
        [BsonElement]
        public Nullable<System.Guid> ModifiedBy { get; set; }
        [BsonElement]
        public Nullable<System.DateTime> DateCreated { get; set; }
        [BsonElement]
        public Nullable<System.DateTime> DateModified { get; set; }
        [BsonElement]
        public HttpPostedFileBase Image { get; set; }
        [BsonElement]
        public Nullable<int> HaveImage { get; set; }
        [BsonElement]
        public string ImageName { get; set; }
        [BsonElement]
        public string SEO_Slug { get; set; }
    }
}